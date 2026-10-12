import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "webvibez.com",
      },
    ],
  },
  trailingSlash: false,
  async redirects() {
    return [
      // Common legacy backlink paths & aliases (301 Permanent)
      { source: "/service", destination: "/services", permanent: true },
      { source: "/solutions", destination: "/services", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/company", destination: "/about", permanent: true },
      { source: "/products", destination: "/product", permanent: true },
      { source: "/work", destination: "/portfolio", permanent: true },
      { source: "/works", destination: "/portfolio", permanent: true },
      { source: "/case-studies", destination: "/portfolio", permanent: true },
      { source: "/case-study", destination: "/portfolio", permanent: true },
      { source: "/pricing-plans", destination: "/pricing", permanent: true },
      { source: "/cost-calculator", destination: "/pricing", permanent: true },
      { source: "/calculator", destination: "/pricing", permanent: true },
      { source: "/plans", destination: "/pricing", permanent: true },

      // Service aliases & legacy URLs
      { source: "/app-development", destination: "/services/mobile-app-development", permanent: true },
      { source: "/mobile-app", destination: "/services/mobile-app-development", permanent: true },
      { source: "/mobile-apps", destination: "/services/mobile-app-development", permanent: true },
      { source: "/mobile-app-development", destination: "/services/mobile-app-development", permanent: true },
      { source: "/web-development", destination: "/services/website-development", permanent: true },
      { source: "/website-development", destination: "/services/website-development", permanent: true },
      { source: "/web-app-development", destination: "/services/website-development", permanent: true },
      { source: "/custom-software", destination: "/services/custom-software-development", permanent: true },
      { source: "/custom-software-development", destination: "/services/custom-software-development", permanent: true },
      { source: "/coaching-app", destination: "/services/coaching-class-management-app", permanent: true },
      { source: "/coaching-software", destination: "/services/coaching-class-management-app", permanent: true },
      { source: "/coaching-classes-app", destination: "/services/coaching-class-management-app", permanent: true },
      { source: "/coaching-management-software", destination: "/services/coaching-class-management-app", permanent: true },
      { source: "/services/coaching-management-software", destination: "/services/coaching-class-management-app", permanent: true },
      { source: "/services/ecommerce-solutions", destination: "/services/custom-software-development", permanent: true },
      { source: "/services/digital-marketing", destination: "/services", permanent: true },
      { source: "/ecommerce-solutions", destination: "/services/custom-software-development", permanent: true },
      { source: "/digital-marketing", destination: "/services", permanent: true },

      // Policy & Legal aliases
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/refund", destination: "/refund-policy", permanent: true },
      { source: "/cancellation-policy", destination: "/refund-policy", permanent: true },
      { source: "/agreement", destination: "/agreements", permanent: true },
      { source: "/sla", destination: "/agreements", permanent: true },
    ];
  },
};

export default nextConfig;
