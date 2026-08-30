import { defineField, defineType } from "sanity";

export const artist = defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Artist Name",
      type: "string",
    }),
  ],
});
