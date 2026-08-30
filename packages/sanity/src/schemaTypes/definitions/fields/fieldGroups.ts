import type { FieldGroupDefinition } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { ImageIcon } from "@sanity/icons/Image";
import { MenuIcon } from "@sanity/icons/Menu";
import { SearchIcon } from "@sanity/icons/Search";
import { CogIcon } from "@sanity/icons/Cog";

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

export const seoGroup = {
  name: "seo",
  title: "SEO",
  icon: SearchIcon,
};

export const settingsGroup = {
  name: "settings",
  title: "Settings",
  icon: CogIcon,
};

/** Named lookups for spreading into `groups` or assigning `group: fieldGroups.content.name`. */
export const fieldGroups = {
  content: contentGroup,
  media: mediaGroup,
  navigation: navigationGroup,
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
