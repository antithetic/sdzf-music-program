import { defineField, defineType } from "sanity";
import { Tag } from "lucide-react";

export const tag = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  icon: Tag,
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
      validation: (Rule) =>
        Rule.required().error(`Required to generate a tag page on the website`),
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
      name: "image",
      title: "Image",
      description:
        "The image for the tag. This will be displayed on the tag page. If no image is provided, a default image will be used.",
      type: "image",
      options: {
        hotspot: true,
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          description: "The alt text for the image",
          type: "string",
          hidden: ({ document }) => !document?.image,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled Tag",
        media: media || Tag,
      };
    },
  },
});
