// next.config.mjs
import transpileModules from "next-transpile-modules";

const withTM = transpileModules([
  "@mui/x-charts",
  "@mui/material",
  "@emotion/react",
  "@emotion/styled",
]);

export default withTM({
  reactStrictMode: true,
});

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;
