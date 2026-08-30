import {
  definePage,
  defineImage,
  defineCta,
  defineRichText,
  defineSeo,
} from "../definitions/presets";

import {
  slugField,
  titleField,
  imageBlockField,
} from "../definitions/fields/commonFields";

import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";
import {
  fieldGroups,
  pageFieldGroups,
} from "../definitions/fields/fieldGroups";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: FileText,
  groups: pageFieldGroups,
  fields: [
    defineField({
      ...titleField,
      group: fieldGroups.content.name,
    }),
    defineField({
      ...slugField,
      group: fieldGroups.navigation.name,
    }),
    // TODO: upgrade to page builder
    defineField({
      name: "content",
      title: "Content",
      type: "blockContent",
      group: fieldGroups.content.name,
    }),
    defineField({
      ...imageBlockField,
      group: fieldGroups.media.name,
    }),
    defineSeo({
      name: "metadata",
      title: "Metadata",
      description:
        "The SEO 'Search Engine Optimization' metadata for the page. This will be used to generate the page metadata. This comes in handy when sharing the page on social media or other platforms.",
      group: fieldGroups.seo.name,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare(selection) {
      const { title, media } = selection;
      return { title, media };
    },
  },
});
