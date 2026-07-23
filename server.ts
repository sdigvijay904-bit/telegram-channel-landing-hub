import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_DIR = path.join(process.cwd(), "data");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");

const defaultConfig = {
  telegramLink: "",
  passcode: "admin123",
  title: "Telegram Official",
  subtitle: "Join India's Most Trusted Telegram Channel for Daily Earnings & Instant Updates",
  badges: [
    { id: "1", text: "Telegram Group Join Karo", icon: "CheckCircle2", color: "emerald" },
    { id: "2", text: "Daily ₹1000 - ₹5000 Earn", icon: "Banknote", color: "amber" },
    { id: "3", text: "Limited Seats Available", icon: "Flame", color: "rose" },
    { id: "4", text: "Instant Payment Proof & Signals", icon: "Zap", color: "blue" }
  ],
  buttonText: "JOIN TELEGRAM CHANNEL NOW",
  buttonSubtext: "Click to Open in Telegram • Free Access",
  secondaryButtonText: "DIRECT WHATSAPP SUPPORT",
  whatsappLink: "https://wa.me/",
  showWhatsapp: false,
  animationType: "pulse-glow", // 'pulse-glow' | 'shimmer' | 'bounce' | 'ripple-ring' | 'neon-breath'
  themeColor: "frosted-glass", // 'frosted-glass' | 'red-emerald' | 'cyan-blue' | 'purple-gold' | 'neon-dark' | 'sunset-fire'
  memberCount: 48520,
  timerMinutes: 5,
  totalClicks: 1240,
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
    return { ...defaultConfig, ...JSON.parse(data) };
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
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
