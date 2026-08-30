import { defineField } from "sanity";
import { CircleSmall } from "lucide-react";

const pronounPattern = /^[a-z]+(?:\/[a-z]+)+$/i;

export const pronounsField = defineField({
  name: "pronouns",

  title: "Pronouns",

  type: "array",

  description: "Select one or more pronouns. Choose Custom to enter your own.",

  of: [
    {
      type: "object",

      name: "pronoun",

      fields: [
        defineField({
          name: "type",

          title: "Pronouns",

          type: "string",

          options: {
            list: [
              { title: "He / Him", value: "he/him" },
              { title: "She / Her", value: "she/her" },
              { title: "They / Them", value: "they/them" },
              { title: "He / They", value: "he/they" },
              { title: "She / They", value: "she/they" },
              { title: "Ze / Zir", value: "ze/zir" },
              { title: "Xe / Xem", value: "xe/xem" },
              { title: "Ey / Em", value: "ey/em" },
              { title: "Any Pronouns", value: "any" },
              { title: "Custom", value: "custom" },
            ],

            layout: "dropdown",
          },

          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "custom",

          title: "Custom Pronouns",

          type: "string",

          hidden: ({ parent }) => parent?.type !== "custom",

          validation: (Rule) =>
            Rule.custom((value, context) => {
              if ((context.parent as { type?: string })?.type !== "custom") {
                return true;
              }

              if (!value) {
                return "Please enter your custom pronouns.";
              }

              if (!pronounPattern.test(value.trim())) {
                return 'Use the format "he/him", "they/them", etc.';
              }

              return true;
            }),
        }),
      ],

      preview: {
        select: {
          type: "type",
          custom: "custom",
        },

        prepare({ type, custom }) {
          return {
            title:
              type === "custom"
                ? custom || "Custom Pronouns"
                : type || "Pronouns",

            media: CircleSmall,
          };
        },
      },
    },
  ],

  validation: (Rule) => Rule.unique(),
});
