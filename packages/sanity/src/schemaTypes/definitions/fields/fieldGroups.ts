import type { FieldGroupDefinition } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { ImageIcon } from "@sanity/icons/Image";
import { MenuIcon } from "@sanity/icons/Menu";
import { SearchIcon } from "@sanity/icons/Search";
import { CogIcon } from "@sanity/icons/Cog";
import { UserIcon } from "@sanity/icons/User";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { CommentIcon } from "@sanity/icons/Comment";
import { SchemaIcon } from "@sanity/icons/Schema";
import { ClockIcon } from "@sanity/icons/Clock";

export const affiliationsGroup = {
  name: "affiliations",
  title: "Affiliations",
  icon: SchemaIcon,
};
export const contactGroup = {
  name: "contact",
  title: "Contact",
  icon: EnvelopeIcon,
};

export const contentGroup = {
  name: "content",
  title: "Content",
  icon: DocumentTextIcon,
};

export const mediaGroup = {
  name: "media",
  title: "Media",
  icon: ImageIcon,
};

export const navigationGroup = {
  name: "navigation",
  title: "Navigation",
  icon: MenuIcon,
};

export const notesGroup = {
  name: "notes",
  title: "Notes",
  icon: CommentIcon,
};

export const profileGroup = {
  name: "profile",
  title: "Profile",
  icon: UserIcon,
};

export const seoGroup = {
  name: "seo",
  title: "SEO",
  icon: SearchIcon,
};

export const scheduleGroup = {
  name: "schedule",
  title: "Schedule",
  icon: ClockIcon,
};

export const settingsGroup = {
  name: "settings",
  title: "Settings",
  icon: CogIcon,
};

/** Named lookups for spreading into `groups` or assigning `group: fieldGroups.content.name`. */
export const fieldGroups = {
  affiliations: affiliationsGroup,
  contact: contactGroup,
  content: contentGroup,
  media: mediaGroup,
  navigation: navigationGroup,
  notes: notesGroup,
  profile: profileGroup,
  schedule: scheduleGroup,
  seo: seoGroup,
  settings: settingsGroup,
} as const;

/** Default groups for page documents. Content is the default tab. */
export const pageFieldGroups: FieldGroupDefinition[] = [
  { ...contentGroup, default: true },
  mediaGroup,
  navigationGroup,
  seoGroup,
  settingsGroup,
];

export const editionFieldGroups: FieldGroupDefinition[] = [
  { ...contentGroup, default: true },
  mediaGroup,
  navigationGroup,
  seoGroup,
  settingsGroup,
];

export const artistFieldGroups: FieldGroupDefinition[] = [
  { ...profileGroup, default: true },
  contentGroup,
  mediaGroup,
  contactGroup,
  navigationGroup,
];

export const contactFieldGroups: FieldGroupDefinition[] = [
  { ...contactGroup, default: true },
  affiliationsGroup,
  notesGroup,
  mediaGroup,
];

export const eventFieldGroups: FieldGroupDefinition[] = [
  { ...contentGroup, default: true },
  mediaGroup,
  navigationGroup,
  scheduleGroup,
  notesGroup,
];
