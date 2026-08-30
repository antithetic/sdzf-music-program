import { defineField } from "sanity";

import {
  SiBandcamp,
  SiSoundcloud,
  SiMixcloud,
  SiYoutube,
  SiSpotify,
} from "@icons-pack/react-simple-icons";
import { Link } from "lucide-react";

const platformUrlPatterns: Record<string, RegExp> = {
  bandcamp: /^https?:\/\/(?:[\w-]+\.)?bandcamp\.com\/.+$/i,

  soundcloud: /^https?:\/\/(?:www\.)?soundcloud\.com\/.+$/i,

  mixcloud: /^https?:\/\/(?:www\.)?mixcloud\.com\/.+$/i,

  youtube: /^https?:\/\/(?:www\.)?(?:youtube\.com\/.+|youtu\.be\/.+)$/i,

  spotify:
    /^https?:\/\/open\.spotify\.com\/(?:artist|album|track|playlist|show|episode)\/.+$/i,
};

const platformLabels: Record<string, string> = {
  bandcamp: "Bandcamp",
  soundcloud: "SoundCloud",
  mixcloud: "Mixcloud",
  youtube: "YouTube",
  spotify: "Spotify",
};

const platformIcons: Record<string, React.ComponentType> = {
  bandcamp: SiBandcamp,
  soundcloud: SiSoundcloud,
  mixcloud: SiMixcloud,
  youtube: SiYoutube,
  spotify: SiSpotify,
  custom: Link,
};

export const musicLinksField = defineField({
  name: "musicLinks",

  title: "Music Links",

  type: "array",

  description:
    "Add links to music, mixes, videos, or other relevant platforms.",

  of: [
    {
      type: "object",

      name: "musicLink",

      fields: [
        defineField({
          name: "platform",

          title: "Platform",

          type: "string",

          options: {
            list: [
              { title: "Bandcamp", value: "bandcamp" },
              { title: "SoundCloud", value: "soundcloud" },
              { title: "Mixcloud", value: "mixcloud" },
              { title: "YouTube", value: "youtube" },
              { title: "Spotify", value: "spotify" },
              { title: "Custom", value: "custom" },
            ],

            layout: "dropdown",
          },

          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "customLabel",

          title: "Link Name",

          type: "string",

          description: "Enter a name for this custom platform.",

          hidden: ({ parent }) => parent?.platform !== "custom",

          validation: (Rule) =>
            Rule.custom((value, context) => {
              if (
                (context.parent as { platform?: string })?.platform !== "custom"
              ) {
                return true;
              }

              if (!value?.trim()) {
                return "Please enter a name for the custom link.";
              }

              return true;
            }),
        }),

        defineField({
          name: "url",

          title: "URL",

          type: "url",

          description: "Enter the full URL to the artist's music or profile.",

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
              ? customLabel || "Custom Link"
              : platformLabels[platform] || "Music Link";

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
