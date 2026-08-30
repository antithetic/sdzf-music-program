import { defineField, defineType } from "sanity";
import { slugField } from "../definitions/fields/commonFields";
import { CalendarHeart } from "lucide-react";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarHeart,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      ...slugField,
    }),
  ],
});
