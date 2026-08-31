import { defineArrayMember, defineField, defineType } from "sanity";
import { pronounsField } from "../definitions/fields/pronounsField";
import { musicLinksField } from "../definitions/fields/musicLinksField";
import { socialLinksField } from "../definitions/fields/socialLinks";
import { webLinksField } from "../definitions/fields/webLinksField";
import { UserStar } from "lucide-react";
import {
  artistFieldGroups,
  fieldGroups,
} from "../definitions/fields/fieldGroups";
import {
  imageBlockField,
  locationField,
} from "../definitions/fields/commonFields";

export const artist = defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  icon: UserStar,
  groups: artistFieldGroups,
  fields: [
    defineField({
      name: "name",
      title: "Artist Name",
      type: "string",
      group: fieldGroups.profile.name,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      ...pronounsField,
      name: "pronouns",
      title: "Artist Pronouns",
      group: fieldGroups.profile.name,
    }),

    defineField({
      ...locationField,
      description: "City or cities where the artist is based.",
      group: fieldGroups.profile.name,
    }),

    // TODO: merge contactName and contactLinks into a single array of objects with name and links properties and use the name as the title and the links as the value
    // defineField({
    //   name: "contactName",
    //   title: "Contact Name",
    //   description: "The name or point-of-contact for this artist.",
    //   type: "string",
    //   group: fieldGroups.contact.name,
    // }),
    // defineField({
    //   ...contactLinksField,
    //   name: "contactLinks",
    //   title: "Contact Links",
    //   description: "Add email or phone number for the artist's contact.",
    //   group: fieldGroups.contact.name,
    // }),
    // TODO: add a contact reference to the artist
    defineField({
      name: "contact",
      title: "Contact",
      description: "The contact for this artist.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "contact" }] }],
      group: fieldGroups.contact.name,
    }),
    defineField({
      name: "bio",
      title: "Artist Bio",
      description: "A brief bio of the artist.",
      type: "text",
      group: fieldGroups.content.name,
    }),
    defineField({
      name: "tags",
      title: "Artist Tags",
      type: "tags",
      group: fieldGroups.content.name,
      options: { includeFromRelated: "tags", allowCreate: true },
    }),
    defineField({
      ...webLinksField,
      name: "webLinks",
      title: "Web Links",
      group: fieldGroups.content.name,
    }),
    defineField({
      ...socialLinksField,
      name: "socialLinks",
      title: "Social Links",
      description: "Add links to the artist's social media profiles.",
      group: fieldGroups.content.name,
    }),
    defineField({
      name: "image",
      title: "Artist Image",
      description:
        "Images of the artist. This will be displayed on the artist's page and used as the social media image when sharing the artist on social media or other platforms.",
      type: "array",
      of: [defineArrayMember({ ...imageBlockField })],
      group: fieldGroups.media.name,
    }),
    defineField({
      ...musicLinksField,
      name: "musicLinks",
      title: "Music Links",
      description:
        "Add links to music, mixes, videos, or other relevant platforms.",
      group: fieldGroups.media.name,
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image.0",
      pronouns: "pronouns",
    },
    prepare({ title, media, pronouns }) {
      const subtitle = pronouns
        ?.map((pronoun: { type?: string; custom?: string }) =>
          pronoun.type === "custom"
            ? pronoun.custom || "Custom Pronouns"
            : pronoun.type,
        )
        .filter(Boolean)
        .join(", ");

      return {
        title: title || "Untitled Artist",
        subtitle: subtitle || undefined,
        media,
      };
    },
  },
});
