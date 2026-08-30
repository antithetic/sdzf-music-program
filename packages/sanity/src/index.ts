import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";
import { media } from "sanity-plugin-media";

export const sharedConfig = {
  projectId: "7mueck3w",
  dataset: "production",
};

export const sharedPlugins = [structureTool(), media(), visionTool()];

export const config = defineConfig({
  name: "sdzf-music",
  title: "SDZF Music",

  ...sharedConfig,

  plugins: [...sharedPlugins],

  schema: {
    types: schemaTypes,
  },
});
