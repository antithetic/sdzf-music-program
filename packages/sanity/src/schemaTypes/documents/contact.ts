import { defineArrayMember, defineField, defineType } from "sanity";
import { Contact } from "lucide-react";
import { CommentIcon } from "@sanity/icons/Comment";
import { BinaryDocumentIcon } from "@sanity/icons/BinaryDocument";
import { ImageIcon } from "@sanity/icons/Image";
import { contactLinksField } from "../definitions/fields/contactLinksField";
import {
  contactFieldGroups,
  fieldGroups,
} from "../definitions/fields/fieldGroups";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  icon: Contact,
  groups: contactFieldGroups,
  fields: [
    defineField({
      name: "name",
      title: "Contact Name",
      description: "Name or Point-of-Contact.",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: fieldGroups.contact.name,
    }),

    defineField({
      ...contactLinksField,
      name: "contactLinks",
      title: "Contact Links",
      description: "Add email, phone, or another way to reach this contact.",
      group: fieldGroups.contact.name,
    }),

    defineField({
      name: "affiliations",
      title: "Affiliations",
      description: "Add any affiliations for this contact.",
      group: fieldGroups.affiliations.name,
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "venue" }, { type: "artist" }, { type: "contact" }],
        },
      ],
    }),

    defineField({
      name: "notes",
      title: "Notes",
      description: "Add any additional notes about this contact.",
      group: fieldGroups.notes.name,
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "note",
          icon: CommentIcon,
          fields: [
            defineField({
              name: "note",
              title: "Note",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "date",
              title: "Date Created",
              type: "date",
            }),
            defineField({
              name: "author",
              title: "Added by",
              type: "string",
            }),
          ],

          preview: {
            select: {
              title: "note",
              date: "date",
              author: "author",
            },
            prepare({ title, date, author }) {
              const formattedDate = date
                ? new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }).format(new Date(`${date}T12:00:00`))
                : undefined;
              const subtitle = [formattedDate, author]
                .filter(Boolean)
                .join(" · ");

              return {
                title: title || "Untitled Note",
                subtitle: subtitle || undefined,
                media: CommentIcon,
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "media",
      title: "Media",
      description:
        "Note: These are internal media and not meant to be shared externally.",
      group: fieldGroups.media.name,
      type: "array",
      of: [
        defineArrayMember({
          name: "image",
          type: "image",
          icon: ImageIcon,
          fields: [
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
            defineField({
              name: "notes",
              title: "Notes",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "description",
              notes: "notes",
              media: "asset",
            },
            prepare({ title, notes, media }) {
              return {
                title: title || "Untitled Image",
                subtitle: notes || undefined,
                media,
              };
            },
          },
        }),
        defineArrayMember({
          name: "file",
          type: "file",
          icon: BinaryDocumentIcon,
          fields: [
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
            defineField({
              name: "notes",
              title: "Notes",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "description",
              notes: "notes",
              media: "asset",
            },
            prepare({ title, notes, media }) {
              return {
                title: title || "Untitled File",
                subtitle: notes || undefined,
                media: media || BinaryDocumentIcon,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      firstLink: "contactLinks.0.value",
      secondLink: "contactLinks.1.value",
    },
    prepare({ title, firstLink, secondLink }) {
      const subtitle = [firstLink, secondLink].filter(Boolean).join(" · ");

      return {
        title: title || "Untitled Contact",
        subtitle: subtitle || undefined,
      };
    },
  },
});
