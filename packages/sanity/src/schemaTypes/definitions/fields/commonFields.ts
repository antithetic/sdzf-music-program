import { defineField } from "sanity";

export const titleField = defineField({
  name: "title",
  title: "Title",
  description: "The title for the page. It will be displayed on the website.",
  type: "string",
  validation: (Rule) => Rule.required(),
});

export const slugField = defineField({
  name: "slug",
  title: "Slug",
  description:
    "The slug for the page. This will be used to generate the page URL. Must be unique and lowercase. This is how the page will be referenced in the URL and accessed on the web.",
  type: "slug",
  options: {
    source: "title",
  },
  validation: (Rule) =>
    Rule.required()
      .error(
        `Required to generate a page on the website. Must be unique and lowercase.`,
      )
      .custom((slug) => {
        if (!slug?.current) return true;
        if (slug.current !== slug.current.toLowerCase()) {
          return "Slug must be lowercase";
        }
        return true;
      }),
});

export const imageBlockField = defineField({
  name: "image",
  title: "Image",
  description:
    "The image for the page. This will be displayed on the page. \ This image will also be used as the social media image when sharing the page on social media or other platforms.",
  type: "image",
  fields: [
    defineField({
      name: "alt",
      type: "string",
      description:
        "Describes the image for screen readers and search engines. Important for accessibility.",
    }),
    defineField({
      name: "caption",
      type: "text",
      description:
        "The caption  for the image. This will be displayed below the image on the page.",
      rows: 3,
    }),
  ],
});
