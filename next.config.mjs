/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
  },
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
  env: {
    WS_URL: process.env.WS_URL,
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
