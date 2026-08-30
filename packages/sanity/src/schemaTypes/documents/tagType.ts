import { defineField, defineType } from "sanity";
import { BookmarkIcon } from "@sanity/icons/Bookmark";

export const tagType = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: BookmarkIcon,
  fields: [
    defineField({
      name: "name",
      title: "Tag Name",
      description: "The name of the tag",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "The slug of the tag",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description:
        "If applicable, please provide a description for this tag and/or genre",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      // validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      // validation: (Rule) => Rule.required(),
    }),
  ],
});
