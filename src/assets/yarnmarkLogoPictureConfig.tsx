import yarnmarkLogoSrc from "./images/yarnmark_logo.jpg";
import yarnmarkLogoSrcWebp from "./images/yarnmark_logo.webp";
import yarnmarkLogoSrcAvif from "./images/yarnmark_logo.avif";

export const yarnmarkLogoPictureConfig = {
  fallbackUrl: yarnmarkLogoSrc,
  sources: [
    {
      type: "image/webp",
      url: yarnmarkLogoSrcWebp,
    },
    {
      type: "image/avif",
      url: yarnmarkLogoSrcAvif,
    },
  ],
};
