import { createPresetsRegistry } from "@sanity/presets";
export const {
  definePage,
  defineLink,
  defineCta,
  defineImage,
  defineRichText,
  defineSeo,
} = createPresetsRegistry({
  link: {
    // Document types an internal link can point to. This cascades to
    // every link — standalone, inside CTAs, inside rich text. See "Registry".
    to: ["page"],
  },
});
