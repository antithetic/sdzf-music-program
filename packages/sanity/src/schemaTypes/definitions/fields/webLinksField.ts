import { defineField } from "sanity";
import { Globe, Link } from "lucide-react";

const urlPattern = /^https?:\/\/[^\s]+$/i;

const linkTypeLabels: Record<string, string> = {
  management: "Management",
  booking: "Booking",
  interview: "Interview",
  article: "Article",
  writing: "Writing",
  publication: "Publication",
  webStore: "Web Store",
  merchandise: "Merchandise",
  collective: "Collective",
  biography: "Biography",
  event: "Event",
  archive: "Archive",
  personal: "Personal Website",
  portfolio: "Portfolio",
  project: "Project",
  organization: "Organization",
  label: "Label",
  agency: "Agency",
  pressKit: "Press Kit",
  wikipedia: "Wikipedia",
  other: "Other",
  custom: "Custom",
};

const linkTypeIcons: Record<string, typeof Globe> = {
  personal: Globe,
  portfolio: Globe,
  project: Globe,
  organization: Globe,
  label: Globe,
  agency: Globe,
  pressKit: Globe,
  wikipedia: Globe,
  other: Globe,
  custom: Link,
};

export const webLinksField = defineField({
  name: "webLinks",

  title: "Web Links",

  type: "array",

  description:
    "Add websites, editorial features, professional resources, stores, archives, or other relevant web links.",
  of: [
    {
      type: "object",

      name: "webLink",

      fields: [
        defineField({
          name: "type",

          title: "Link Type",

          type: "string",

          options: {
            list: [
              // Personal & Identity
              {
                title: "Personal Website",
                value: "personal",
              },
              {
                title: "Portfolio",
                value: "portfolio",
              },
              {
                title: "Project",
                value: "project",
              },

              // Professional
              {
                title: "Agency",
                value: "agency",
              },
              {
                title: "Management",
                value: "management",
              },
              {
                title: "Booking",
                value: "booking",
              },
              {
                title: "Press Kit",
                value: "pressKit",
              },

              // Editorial
              {
                title: "Interview",
                value: "interview",
              },
              {
                title: "Article",
                value: "article",
              },
              {
                title: "Writing",
                value: "writing",
              },
              {
                title: "Publication",
                value: "publication",
              },

              // Commerce
              {
                title: "Web Store",
                value: "webStore",
              },
              {
                title: "Merchandise",
                value: "merchandise",
              },

              // Creative / Community
              {
                title: "Label",
                value: "label",
              },
              {
                title: "Collective",
                value: "collective",
              },
              {
                title: "Organization",
                value: "organization",
              },

              // Reference
              {
                title: "Biography",
                value: "biography",
              },
              {
                title: "Wikipedia",
                value: "wikipedia",
              },

              // Other Resources
              {
                title: "Event",
                value: "event",
              },
              {
                title: "Archive",
                value: "archive",
              },
              {
                title: "Other",
                value: "other",
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
          name: "customLabel",

          title: "Custom Type",

          type: "string",

          description: "Enter a name for this type of website or web link.",

          hidden: ({ parent }) => parent?.type !== "custom",

          validation: (Rule) =>
            Rule.custom((value, context) => {
              if ((context.parent as { type?: string })?.type !== "custom") {
                return true;
              }

              if (!value?.trim()) {
                return "Please enter a custom website type.";
              }

              if (value.trim().length < 2) {
                return "Custom type must contain at least 2 characters.";
              }

              if (value.trim().length > 80) {
                return "Custom type must be 80 characters or fewer.";
              }

              return true;
            }),
        }),

        defineField({
          name: "url",

          title: "URL",

          type: "url",

          description: "Enter the full URL, including https://.",

          validation: (Rule) =>
            Rule.required().custom((value) => {
              if (!value) {
                return "Please enter a URL.";
              }

              if (!urlPattern.test(value.trim())) {
                return "Please enter a valid URL beginning with http:// or https://.";
              }

              return true;
            }),
        }),

        defineField({
          name: "description",

          title: "Description",

          type: "text",

          rows: 2,

          description: "Optional context about this website or link.",

          validation: (Rule) => Rule.max(200),
        }),
      ],

      preview: {
        select: {
          type: "type",
          customLabel: "customLabel",
          url: "url",
          description: "description",
        },

        prepare({ type, customLabel, url, description }) {
          const title =
            type === "custom"
              ? customLabel || "Custom Link"
              : linkTypeLabels[type] || "Web Link";

          const Icon = linkTypeIcons[type] || Globe;

          return {
            title,

            subtitle: description
              ? `${url || "No URL specified"} · ${description}`
              : url || "No URL specified",

            media: Icon,
          };
        },
      },
    },
  ],

  validation: (Rule) => Rule.unique(),
});
