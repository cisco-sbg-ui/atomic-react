import CiscoSansTTBoldTtf from "./base/fonts/CiscoSansTTBold.ttf";
import CiscoSansTTBoldWoff from "./base/fonts/CiscoSansTTBold.woff";
import CiscoSansTTBoldWoff2 from "./base/fonts/CiscoSansTTBold.woff2";

import CiscoSansTTExtraLightTtf from "./base/fonts/CiscoSansTTExtraLight.ttf";
import CiscoSansTTExtraLightWoff from "./base/fonts/CiscoSansTTExtraLight.woff";
import CiscoSansTTExtraLightWoff2 from "./base/fonts/CiscoSansTTExtraLight.woff2";

import CiscoSansTTExtraLightObliqueTtf from "./base/fonts/CiscoSansTTExtraLightOblique.ttf";
import CiscoSansTTExtraLightObliqueWoff from "./base/fonts/CiscoSansTTExtraLightOblique.woff";
import CiscoSansTTExtraLightObliqueWoff2 from "./base/fonts/CiscoSansTTExtraLightOblique.woff2";

import CiscoSansTTLightTtf from "./base/fonts/CiscoSansTTLight.ttf";
import CiscoSansTTLightWoff from "./base/fonts/CiscoSansTTLight.woff";
import CiscoSansTTLightWoff2 from "./base/fonts/CiscoSansTTLight.woff2";

import CiscoSansTTLightObliqueTtf from "./base/fonts/CiscoSansTTLightOblique.ttf";
import CiscoSansTTLightObliqueWoff from "./base/fonts/CiscoSansTTLightOblique.woff";
import CiscoSansTTLightObliqueWoff2 from "./base/fonts/CiscoSansTTLightOblique.woff2";

import CiscoSansTTRegularTtf from "./base/fonts/CiscoSansTTRegular.ttf";
import CiscoSansTTRegularWoff from "./base/fonts/CiscoSansTTRegular.woff";
import CiscoSansTTRegularWoff2 from "./base/fonts/CiscoSansTTRegular.woff2";

import CiscoSansTTRegularObliqueTtf from "./base/fonts/CiscoSansTTRegularOblique.ttf";
import CiscoSansTTRegularObliqueWoff from "./base/fonts/CiscoSansTTRegularOblique.woff";
import CiscoSansTTRegularObliqueWoff2 from "./base/fonts/CiscoSansTTRegularOblique.woff2";

import CiscoSansTTThinTtf from "./base/fonts/CiscoSansTTThin.ttf";
import CiscoSansTTThinWoff from "./base/fonts/CiscoSansTTThin.woff";
import CiscoSansTTThinWoff2 from "./base/fonts/CiscoSansTTThin.woff2";

export default `
@font-face {
  font-family: "CiscoSans";
  font-style: normal;
  font-weight: 100;
  src: url("${CiscoSansTTThinWoff2}") format("woff2"),
    url("${CiscoSansTTThinWoff}") format("woff"),
    url("${CiscoSansTTThinTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: normal;
  font-weight: 200;
  src: url("${CiscoSansTTExtraLightWoff2}") format("woff2"),
    url("${CiscoSansTTExtraLightWoff}") format("woff"),
    url("${CiscoSansTTExtraLightTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: oblique;
  font-weight: 200;
  src: url("${CiscoSansTTExtraLightObliqueWoff2}") format("woff2"),
    url("${CiscoSansTTExtraLightObliqueWoff}") format("woff"),
    url("${CiscoSansTTExtraLightObliqueTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: italic;
  font-weight: 200;
  src: url("${CiscoSansTTExtraLightObliqueWoff2}") format("woff2"),
    url("${CiscoSansTTExtraLightObliqueWoff}") format("woff"),
    url("${CiscoSansTTExtraLightObliqueTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: normal;
  font-weight: 300;
  src: url("${CiscoSansTTLightWoff2}") format("woff2"),
    url("${CiscoSansTTLightWoff}") format("woff"),
    url("${CiscoSansTTLightTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: oblique;
  font-weight: 300;
  src: url("${CiscoSansTTLightObliqueWoff2}") format("woff2"),
    url("${CiscoSansTTLightObliqueWoff}") format("woff"),
    url("${CiscoSansTTLightObliqueTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: italic;
  font-weight: 300;
  src: url("${CiscoSansTTLightObliqueWoff2}") format("woff2"),
    url("${CiscoSansTTLightObliqueWoff}") format("woff"),
    url("${CiscoSansTTLightObliqueTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: normal;
  font-weight: 400; // equivalent to normal
  src: url("${CiscoSansTTRegularWoff2}") format("woff2"),
    url("${CiscoSansTTRegularWoff}") format("woff"),
    url("${CiscoSansTTRegularTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: oblique;
  font-weight: 400; // equivalent to normal
  src: url("${CiscoSansTTRegularObliqueWoff2}") format("woff2"),
    url("${CiscoSansTTRegularObliqueWoff}") format("woff"),
    url("${CiscoSansTTRegularObliqueTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: italic;
  font-weight: 400; // equivalent to normal
  src: url("${CiscoSansTTRegularObliqueWoff2}") format("woff2"),
    url("${CiscoSansTTRegularObliqueWoff}") format("woff"),
    url("${CiscoSansTTRegularObliqueTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}

@font-face {
  font-family: "CiscoSans";
  font-style: normal;
  font-weight: 700; // equivalent to bold
  src: url("${CiscoSansTTBoldWoff2}") format("woff2"),
    url("${CiscoSansTTBoldWoff}") format("woff"),
    url("${CiscoSansTTBoldTtf}") format("truetype");
  unicode-range: U+0000-00ff, U+0131, U+0152-0153, U+02c6, U+02da, U+02dc,
    U+2000-206f, U+2074, U+20ac, U+2212, U+2215, U+E0FF, U+EFFD, U+F000;
}`;
