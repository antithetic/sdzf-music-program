import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Site Settings",
    }),
  ],
});
