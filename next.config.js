// const path = require("path");

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   outputFileTracingRoot: path.join(__dirname),
//   webpack: (config) => {
//     config.externals.push("pino-pretty", "lokijs", "encoding");
//     return config;
//   },
// };

// module.exports = nextConfig;

const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👈 ADD THIS

  outputFileTracingRoot: path.join(__dirname),

  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
