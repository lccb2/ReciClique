module.exports = {
  images: {
    domains: ["localhost", "iquottlsqjhsotdwiwaa.supabase.co"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
        pathname: "/uploads/**",
      },
    ],
  },
};
