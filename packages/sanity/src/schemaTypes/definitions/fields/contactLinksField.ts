import { defineField } from "sanity";
import { Mail, Phone, Link } from "lucide-react";

const emailPattern =
  /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i;

const phonePattern = /^\+?[1-9]\d{1,14}$/;

const platformLabels: Record<string, string> = {
  email: "Email",
  phone: "Phone",
  custom: "Custom",
};

const platformIcons = {
  email: Mail,
  phone: Phone,
  custom: Link,
};

export const contactLinksField = defineField({
  name: "contactLinks",

  title: "Contact Information",

  type: "array",

  description:
    "Add contact information such as an email address, phone number, or custom contact method.",

  of: [
    {
      type: "object",

      name: "contactLink",

      fields: [
        defineField({
          name: "type",

          title: "Contact Type",

          type: "string",

          options: {
            list: [
              {
                title: "Email",
                value: "email",
              },
              {
                title: "Phone",
                value: "phone",
              },
              {
                title: "Custom",
                value: "custom",
              },
            ],

            layout: "dropdown",
          },

          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "label",

          title: "Label",

          type: "string",

          description:
            "Optional label such as Booking, Management, Press, or General.",

          validation: (Rule) => Rule.max(80),
        }),

        defineField({
          name: "customLabel",

          title: "Contact Name",

          type: "string",

          description: "Enter a name for this custom contact method.",

          hidden: ({ parent }) => parent?.type !== "custom",

          validation: (Rule) =>
            Rule.custom((value, context) => {
              if ((context.parent as { type?: string })?.type !== "custom") {
                return true;
              }

              if (!value?.trim()) {
                return "Please enter a name for the custom contact method.";
              }

              return true;
            }),
        }),

        defineField({
          name: "value",

          title: "Contact Information",

          type: "string",

          description: "Enter an email address or phone number.",

          validation: (Rule) =>
            Rule.required().custom((value, context) => {
              if (!value?.trim()) {
                return "Please enter contact information.";
              }

              const type = (context.parent as { type?: string })?.type;

              if (type === "email") {
                if (!emailPattern.test(value.trim())) {
                  return "Please enter a valid email address.";
                }
              }

              if (type === "phone") {
                const normalizedPhone = value.replace(/[\s().-]/g, "");

                if (!phonePattern.test(normalizedPhone)) {
                  return "Please enter a valid phone number.";
                }
              }

              return true;
            }),
        }),

        defineField({
          name: "notes",

          title: "Notes",

          type: "text",

          rows: 2,

          description:
            "Optional context for this contact, such as its purpose or availability.",

          validation: (Rule) => Rule.max(200),
        }),
      ],

      preview: {
        select: {
          type: "type",
          label: "label",
          customLabel: "customLabel",
          value: "value",
          notes: "notes",
        },

        prepare({ type, label, customLabel, value, notes }) {
          const title =
            type === "custom"
              ? customLabel || "Custom Contact"
              : label || platformLabels[type] || "Contact";

          const Icon =
            platformIcons[type as keyof typeof platformIcons] || Link;

          return {
            title,
            subtitle: notes
              ? `${value || "No contact information"} · ${notes}`
              : value || "No contact information specified",
            media: Icon,
          };
        },
      },
    },
  ],

  validation: (Rule) => Rule.unique(),
});
