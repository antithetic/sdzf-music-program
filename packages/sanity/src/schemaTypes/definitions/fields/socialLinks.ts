import { defineField } from "sanity";

import {
  SiInstagram,
  SiFacebook,
  SiX,
  SiBluesky,
  SiTiktok,
} from "@icons-pack/react-simple-icons";

import { Link } from "lucide-react";

const platformUrlPatterns: Record<string, RegExp> = {
  instagram: /^https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9._-]+\/?$/i,

  facebook:
    /^https?:\/\/(?:www\.)?facebook\.com\/(?:[A-Za-z0-9._-]+|profile\.php\?id=\d+)\/?$/i,

  twitter: /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[A-Za-z0-9_]+\/?$/i,

  bluesky: /^https?:\/\/bsky\.app\/profile\/.+$/i,

  tiktok: /^https?:\/\/(?:www\.)?tiktok\.com\/@[\w.-]+\/?$/i,
};

const platformLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "Twitter / X",
  bluesky: "Bluesky",
  tiktok: "TikTok",
};

const platformIcons: Record<string, React.ComponentType> = {
  instagram: SiInstagram,
  facebook: SiFacebook,
  twitter: SiX,
  bluesky: SiBluesky,
  tiktok: SiTiktok,
  custom: Link,
};

export const socialLinksField = defineField({
  name: "socialLinks",

  title: "Social Links",

  type: "array",

  description:
    "Add social media profiles associated with this person, artist, or organization.",

  of: [
    {
      type: "object",

      name: "socialLink",

      fields: [
        defineField({
          name: "platform",

          title: "Platform",

          type: "string",

          options: {
            list: [
              { title: "Instagram", value: "instagram" },
              { title: "Facebook", value: "facebook" },
              { title: "Twitter / X", value: "twitter" },
              { title: "Bluesky", value: "bluesky" },
              { title: "TikTok", value: "tiktok" },
              { title: "Custom", value: "custom" },
            ],

            layout: "dropdown",
          },

          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "customLabel",

          title: "Platform Name",

          type: "string",

          description: "Enter the name of the custom social platform.",

          hidden: ({ parent }) => parent?.platform !== "custom",

          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (
                (context.parent as { platform?: string })?.platform !== "custom"
              ) {
                return true;
              }

              if (!value?.trim()) {
                return "Please enter a platform name.";
              }

              return true;
            }),
        }),

        defineField({
          name: "url",

          title: "URL",

          type: "url",

          description: "Enter the full URL to the social media profile.",

          validation: (Rule) =>
            Rule.required().custom((value, context) => {
              if (!value) {
                return "Please enter a URL.";
              }

              const platform = (context.parent as { platform?: string })
                ?.platform;

              if (!platform || platform === "custom") {
                return true;
              }

              const pattern = platformUrlPatterns[platform];

              if (pattern && !pattern.test(value)) {
                return `Please enter a valid ${platformLabels[platform]} URL.`;
              }

              return true;
            }),
        }),
      ],

      preview: {
        select: {
          platform: "platform",
          customLabel: "customLabel",
          url: "url",
        },

        prepare({ platform, customLabel, url }) {
          const title =
            platform === "custom"
              ? customLabel || "Custom Platform"
              : platformLabels[platform] || "Social Link";

          return {
            title,
            subtitle: url || "No URL specified",
            media: platformIcons[platform] || Link,
          };
        },
      },
    },
  ],

  validation: (Rule) => Rule.unique(),
});
