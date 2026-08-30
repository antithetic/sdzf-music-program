import { defineField, defineType } from "sanity";
import { FolderBookmark } from "lucide-react";
import { slugField } from "../definitions/fields/commonFields";
import {
  fieldGroups,
  editionFieldGroups,
} from "../definitions/fields/fieldGroups";

import { eventDatesField } from "../definitions/fields/eventDatesField";

export const edition = defineType({
  name: "edition",
  title: "Edition",
  type: "document",
  icon: FolderBookmark,
  groups: editionFieldGroups,
  fields: [
    defineField({
      name: "title",
      title: "Edition Title",
      description:
        "The title of the edition. This will be used to identify the edition.",
      type: "string",
      group: fieldGroups.content.name,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Edition Year",
      description:
        "The year of the edition. This will be used to identify yearly music programs.",
      group: fieldGroups.content.name,
      type: "date",
      options: {
        dateFormat: "YYYY",
      },
    }),
    defineField({
      ...eventDatesField,

      name: "editionDates",

      title: "Edition Dates",
      group: fieldGroups.content.name,
    }),
    defineField({
      ...slugField,
      group: fieldGroups.navigation.name,
    }),
  ],

  preview: {
    select: {
      title: "title",
      year: "year",
      editionDates: "editionDates",
    },

    prepare({ title, year, editionDates }) {
      const formatDate = (date: string) =>
        new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(`${date}T12:00:00`));

      const dates = editionDates
        ?.map((item: { date?: string }) => item.date)
        .filter(Boolean)
        .sort() as string[] | undefined;

      let subtitle = "No dates specified";

      if (dates?.length === 1) {
        subtitle = formatDate(dates[0]);
      }

      if (dates && dates.length > 1) {
        const firstDate = dates[0];
        const lastDate = dates[dates.length - 1];

        subtitle =
          firstDate === lastDate
            ? formatDate(firstDate)
            : `${formatDate(firstDate)} – ${formatDate(lastDate)}`;
      }

      if (!dates?.length && year) {
        subtitle = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
        }).format(new Date(`${year}T12:00:00`));
      }

      return {
        title: title || "Untitled Edition",
        subtitle,
      };
    },
  },
});
