import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const basePath = "/";

const app = express();

const buildPath = path.join(path.resolve(__dirname, "./dist"));

app.use(basePath, express.static(buildPath, { index: false }));

app.get(`${basePath}isAlive|${basePath}isReady`, (req, res) => {
  res.send("OK");
});

app.use(
  `${process.env.NEXT_PUBLIC_API_POST_URL}`,
  createProxyMiddleware({
    target: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: { [`^${process.env.NEXT_PUBLIC_API_POST_URL}`]: "" },
  })
);

app.use(
  `${process.env.NEXT_PUBLIC_API_GET_URL}`,
  createProxyMiddleware({
    target: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    changeOrigin: true,
    pathRewrite: { [`^${process.env.NEXT_PUBLIC_API_GET_URL}`]: "" },
  })
);

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) =>
  res.sendFile(`${buildPath}/index.html`)
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
