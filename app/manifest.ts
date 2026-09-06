import { getRestaurantConfig } from "@/lib/queries";
import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const config = await getRestaurantConfig();

  return {
    name: config.name || "QR Menu Digital Restaurant",
    short_name: config.name ? config.name.slice(0, 12) : "QR Menu",
    description: config.description || "Browse our digital restaurant menu and explore chef recommendations.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#18181b",
    icons: [
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
