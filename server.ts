import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const JWT_SECRET = "tosafeng-secret-key-12345";
const ADMIN_CREDENTIALS = {
  username: "tosafeng",
  password: "admintosafeng"
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // API Routes
  
  // Login API
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1d" });
      res.cookie("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
      return res.json({ success: true, message: "Login successful" });
    }
    
    res.status(401).json({ success: false, message: "Invalid credentials" });
  });

  // Logout API
  app.post("/api/logout", (req, res) => {
    res.clearCookie("admin_token");
    res.json({ success: true });
  });

  // Auth Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.cookies.admin_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    
    try {
      jwt.verify(token, JWT_SECRET);
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  // Check Auth Status
  app.get("/api/auth/status", (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) return res.json({ authenticated: false });
    
    try {
      jwt.verify(token, JWT_SECRET);
      res.json({ authenticated: true });
    } catch (err) {
      res.json({ authenticated: false });
    }
  });

  // Get Content API
  app.get("/api/content", async (req, res) => {
    try {
      const data = await fs.readFile(path.join(process.cwd(), "data", "content.json"), "utf-8");
      res.json(JSON.parse(data));
    } catch (err) {
      res.status(500).json({ error: "Failed to load content" });
    }
  });

  // Update Content API
  app.post("/api/content", authenticate, async (req, res) => {
    try {
      const newContent = req.body;
      await fs.writeFile(
        path.join(process.cwd(), "data", "content.json"), 
        JSON.stringify(newContent, null, 2), 
        "utf-8"
      );
      res.json({ success: true, message: "Content updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to save content" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
