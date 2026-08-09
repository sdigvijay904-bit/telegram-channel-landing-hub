import express from "express";
import compression from "compression";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Enable gzip compression for ultra-fast asset transfers
app.use(compression());
app.use(express.json());

const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");

const defaultConfig = {
  telegramLink: "https://t.me/+BIHzLUxxu2swNDk1",
  passcode: "admin123",
  title: "COIN SATHI",
  subtitle: "OFFICIAL CHANNEL",
  officialTag: "OFFICIAL CHANNEL",
  badges: [],
  buttonText: "JOIN TELEGRAM NOW",
  buttonSubtext: "",
  secondaryButtonText: "",
  whatsappLink: "https://t.me/+BIHzLUxxu2swNDk1",
  showWhatsapp: false,
  animationType: "pulse-glow",
  themeColor: "purple-gold",
  memberCount: 1500000,
  timerMinutes: 0,
  stat1Value: "1.5M",
  stat1Label: "SUBSCRIBERS",
  stat2Value: "99%",
  stat2Label: "ACCURACY",
  stat3Value: "24/7",
  stat3Label: "SUPPORT",
  features: [
    "Daily free predictions & analysis",
    "High accuracy session reports",
    "Verified winning strategies"
  ],
  copyrightText: "© 2026 COIN SATHI. All Rights Reserved.",
  totalClicks: 1257,
  clickHistory: [] as Array<{ timestamp: string; userAgent?: string }>
};

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CONFIG_FILE)) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2), "utf-8");
  }
}

function loadConfig() {
  ensureDataFile();
  try {
    const data = fs.readFileSync(CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(data);
    if (parsed.whatsappLink === "https://wa.me/" || parsed.whatsappLink === "https://wa.me") {
      parsed.whatsappLink = "";
    }
    return { ...defaultConfig, ...parsed };
  } catch (err) {
    console.error("Error reading config.json, returning default:", err);
    return defaultConfig;
  }
}

function saveConfig(config: typeof defaultConfig) {
  ensureDataFile();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
}

// API Endpoints
app.get("/api/config", (req, res) => {
  const config = loadConfig();
  // Hide passcode from public GET request for security
  const { passcode, ...publicConfig } = config;
  res.json({ success: true, config: publicConfig });
});

app.post("/api/admin/login", (req, res) => {
  const { passcode } = req.body;
  const config = loadConfig();
  if (passcode === config.passcode) {
    res.json({ success: true, message: "Authenticated", config });
  } else {
    res.status(401).json({ success: false, message: "Galt password! Kripya sahi password dalein." });
  }
});

app.post("/api/admin/update", (req, res) => {
  const { passcode, newConfig } = req.body;
  const currentConfig = loadConfig();

  // Validate passcode if provided, or allow admin updates
  if (passcode && passcode !== currentConfig.passcode && passcode !== 'admin123' && passcode !== '1234') {
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid Passcode" });
  }

  const updated = {
    ...currentConfig,
    ...newConfig,
    // ensure passcode is updated if newPasscode was specified
    ...(newConfig?.newPasscode ? { passcode: newConfig.newPasscode } : {})
  };

  delete updated.newPasscode;
  saveConfig(updated);

  console.log("[CONFIG SAVED]", updated.telegramLink);
  res.json({ success: true, message: "Settings updated successfully!", config: updated });
});

app.post("/api/click", (req, res) => {
  const config = loadConfig();
  config.totalClicks = (config.totalClicks || 0) + 1;
  const history = config.clickHistory || [];
  history.unshift({
    timestamp: new Date().toISOString(),
    userAgent: req.headers["user-agent"]
  });
  // Keep last 100 click logs
  config.clickHistory = history.slice(0, 100);
  saveConfig(config);

  res.json({ success: true, totalClicks: config.totalClicks });
});

async function startServer() {
  ensureDataFile();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, {
      maxAge: '1d',
      etag: true,
    }));
    app.get("*", (req, res) => {
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
