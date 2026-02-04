import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "dm_shoppingmart.com",
    allowedHosts: ["DM_shoppingmart.com", "dm_shoppingmart.com", "localhost"],
  },
});
