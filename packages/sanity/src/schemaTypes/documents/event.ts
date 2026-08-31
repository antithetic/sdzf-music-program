import { defineArrayMember, defineField, defineType } from "sanity";
import { CalendarHeart, Tag } from "lucide-react";
import { slugField } from "../definitions/fields/commonFields";

import {
  fieldGroups,
  eventFieldGroups,
} from "../definitions/fields/fieldGroups";
import { imageBlockField } from "../definitions/fields/commonFields";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarHeart,
  groups: eventFieldGroups,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: fieldGroups.content.name,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: fieldGroups.content.name,
    }),
    defineField({
      name: "eventTags",
      title: "Event Tags",
      type: "array",
      group: fieldGroups.content.name,
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "tag" }],
          icon: Tag,
        }),
      ],
    }),
    defineField({
      ...imageBlockField,
      group: fieldGroups.media.name,
      title: "Event Image, Flyer or Poster",
      description:
        "This image will be displayed on the event page and used as the social media image when sharing the event on social media or other platforms.",
    }),
    defineField({
      ...slugField,
      group: fieldGroups.navigation.name,
    }),
    // TODO: Add schedule field that allows for multiple dates and times for the event and references the artists, stages and venues for the event.
    defineField({
      name: "schedule",
      title: "Schedule",
      type: "array",
      group: fieldGroups.schedule.name,
      of: [{ type: "string" }],
    }),
  ],
});
