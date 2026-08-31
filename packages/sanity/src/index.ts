import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { media } from "sanity-plugin-media";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { tags } from "sanity-plugin-tags-v4";
import { createLucideIcon } from "lucide-react";
import { pinSafetyOpen } from "@lucide/lab";

const PinSafetyOpen = createLucideIcon("pin-safety-open", pinSafetyOpen);

export const sharedConfig = {
  projectId: "7mueck3w",
  dataset: "production",
};

export const sharedPlugins = [
  // core plugins
  structureTool(),
  media(),
  visionTool(),

  // image asset source plugins
  // for development purposes only, once site is live, remove this plugin
  unsplashImageAsset(),
  tags(),
];

export const config = defineConfig({
  name: "sdzf-music",
  title: "SDZF Music",
  icon: PinSafetyOpen,
  ...sharedConfig,

  plugins: [...sharedPlugins],

  schema: {
    types: schemaTypes,
  },
});
