import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WebVibez Software Developer",
    short_name: "WebVibez",
    description:
      "Custom software, mobile apps, websites, web applications and coaching-class management platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#F8FAFC",
    icons: [
      {
        src: "/images/square-image.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/images/square-image.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
