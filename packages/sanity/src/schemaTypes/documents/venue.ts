import { defineField, defineType } from "sanity";
import { Factory } from "lucide-react";

export const venue = defineType({
  name: "venue",
  title: "Venue",
  type: "document",
  icon: Factory,
  fields: [
    defineField({
      name: "name",
      title: "Venue Name",
      type: "string",
    }),
  ],
});
