import { defineField } from "sanity";

import { CalendarDays } from "lucide-react";

export const eventDatesField = defineField({
  name: "eventDates",

  title: "Event Dates",

  type: "array",

  icon: CalendarDays,

  of: [
    {
      type: "object",

      name: "eventDate",

      fields: [
        defineField({
          name: "date",

          title: "Date",

          type: "date",

          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "startTime",

          title: "Start Time",

          type: "string",

          validation: (Rule) =>
            Rule.required().regex(
              /^(1[0-2]|[1-9])(?::[0-5][0-9])?\s?(AM|PM)$/i,
              {
                name: "12-hour time",
              },
            ),

          description: "Enter a time like 12 PM, 10 AM, or 9:30 PM.",
        }),

        defineField({
          name: "endTime",

          title: "End Time",

          type: "string",

          validation: (Rule) =>
            Rule.required().regex(
              /^(1[0-2]|[1-9])(?::[0-5][0-9])?\s?(AM|PM)$/i,
              {
                name: "12-hour time",
              },
            ),

          description: "Enter a time like 12 PM, 10 AM, or 9:30 PM.",
        }),
      ],

      preview: {
        select: {
          date: "date",
          startTime: "startTime",
          endTime: "endTime",
        },

        prepare({ date, startTime, endTime }) {
          const formattedDate = date
            ? new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(`${date}T12:00:00`))
            : "No date";

          return {
            title: formattedDate,

            subtitle:
              startTime && endTime
                ? `${startTime} – ${endTime}`
                : "No time specified",
          };
        },
      },
    },
  ],

  validation: (Rule) => Rule.required().min(1),
});
