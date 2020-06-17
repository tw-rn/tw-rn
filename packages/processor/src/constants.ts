const START = "^\\.";
const MEDIA = "((?!focus|hover)\\w+\\\\:)?";
const END = "$";

export const TW_CLASSES_REACT_NATIVE_ALLOWLIST = [
  // Container
  "container",
  //Display
  `${START}${MEDIA}(hidden|flex)${END}`,
  // Overflow
  `${START}${MEDIA}overflow-(hidden|visible|scroll)${END}`,
  // Position
  `${START}${MEDIA}(?!static|fixed|sticky)(absolute|relative)${END}`,
  // Top / Right / Bottom / Left
  `${START}${MEDIA}(inset-(?!auto|y|x).*|inset-(x|y)-(?!auto).*|top-(?!auto).*|right-(?!auto).*|bottom-(?!auto).*|left-(?!auto).*)${END}`,
  // Z-Index
  `${START}${MEDIA}z-(?!auto).*${END}`,
  // Flex Direction
  `${START}${MEDIA}(flex-row-?(reverse)?|flex-col-?(reverse)?)${END}`,
  // Flex Wrap
  `${START}${MEDIA}flex-(no-wrap|wrap|wrap-reverse)${END}`,
  // Align Items
  `${START}${MEDIA}items-(stretch|start|center|end|baseline)${END}`,
  // Align Content
  `${START}${MEDIA}content-(start|center|end|between|around)${END}`,
  // Align Self
  `${START}${MEDIA}?self-(auto|start|center|end|stretch)${END}`,
  // Justify Content
  `${START}${MEDIA}justify-(start|center|end|between|around)${END}`,
  // Flex Grow
  `${START}${MEDIA}flex-grow-?(.*)?${END}`,
  // Flex Shrink
  `${START}${MEDIA}flex-shrink-?(.*)?${END}`,
  // Padding
  `${START}${MEDIA}p[xytrbl]?-.*${END}`,
  // Margin
  `${START}-?${MEDIA}m[xytrbl]?-.*${END}`,
  // Width
  `${START}${MEDIA}w-(?!screen|auto).*${END}`,
  // Min-Width
  `${START}${MEDIA}min-w-.*${END}`,
  // Max-Width
  `${START}${MEDIA}max-w-(?!none).*${END}`,
  // Height
  `${START}${MEDIA}h-(?!screen|auto).*${END}`,
  // Min-Height
  `${START}${MEDIA}min-h-(?!screen).*${END}`,
  // Max-Height
  `${START}${MEDIA}max-h-(?!screen).*${END}`,
  // Font Size | Text Alignment | Text Color
  `${START}${MEDIA}text-(?!justify|current).*${END}`,
  // Font Style
  `${START}${MEDIA}(not-)?italic${END}`,
  // Font Style
  `${START}${MEDIA}font-(hairline|thin|light|normal|medium|semibold|bold|extrabold|black)${END}`,
  // Letter Spacing
  `${START}${MEDIA}tracking-(?!tighter|tight|normal|wide|wider|widest).*${END}`,
  // Line Height
  `${START}${MEDIA}leading-(?!none|tight|snug|normal|relaxed|loose).*${END}`,
  // Text Transform
  `${START}${MEDIA}(uppercase|lowercase|capitalize|normal-case)${END}`,
  // Background Color
  `${START}${MEDIA}bg-(?!current|fixed|local|scroll|repeat|no-repeat|repeat-x|repeat-y|repeat-round|repeat-space|bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top|auto|cover|contain).*${END}`,
  // Border Radius
  `${START}${MEDIA}rounded-?.*${END}`,
  // Border Width | Border Color
  `${START}${MEDIA}border(-(?!collapse|separate|current|double|none).*)?${END}`,
  // Opacity
  `${START}${MEDIA}opacity-.*${END}`,
];

export const TW_CLASSES_REACT_ALLOWLIST = [
  // Container
  "container",
  // Box Sizing
  `${START}${MEDIA}box-(border|content)${END}`,
  //Display
  `${START}${MEDIA}(hidden|block|flow-root|inline-block|inline|flex|inline-flex|grid|inline-grid|table|table-caption|table-cell|table-column|table-column-group|table-footer-group|table-header-group|table-row-group|table-row)${END}`,
  // Overflow
  `${START}${MEDIA}overflow-(hidden|visible|scroll)${END}`,
  // Position
  `${START}${MEDIA}(static|fixed|absolute|relative|sticky)${END}`,
  // Top / Right / Bottom / Left
  `${START}${MEDIA}(inset-(?!auto|y|x).*|inset-(x|y)-(?!auto).*|top-(?!auto).*|right-(?!auto).*|bottom-(?!auto).*|left-(?!auto).*)${END}`,
  // Visibility
  `${START}${MEDIA}(visible|invisible)${END}`,
  // Z-Index
  `${START}${MEDIA}z-(?!auto).*${END}`,
  // Flex Direction
  `${START}${MEDIA}(flex-row-?(reverse)?|flex-col-?(reverse)?)${END}`,
  // Flex Wrap
  `${START}${MEDIA}flex-(no-wrap|wrap|wrap-reverse)${END}`,
  // Align Items
  `${START}${MEDIA}items-(stretch|start|center|end|baseline)${END}`,
  // Align Content
  `${START}${MEDIA}content-(start|center|end|between|around)${END}`,
  // Align Self
  `${START}${MEDIA}?self-(auto|start|center|end|stretch)${END}`,
  // Justify Content
  `${START}${MEDIA}justify-(start|center|end|between|around)${END}`,
  // Flex Grow
  `${START}${MEDIA}flex-grow-?(.*)?${END}`,
  // Flex Shrink
  `${START}${MEDIA}flex-shrink-?(.*)?${END}`,
  // Padding
  `${START}${MEDIA}p[xytrbl]?-.*${END}`,
  // Margin
  `${START}-?${MEDIA}m[xytrbl]?-.*${END}`,
  // Width
  `${START}${MEDIA}w-(?!screen|auto).*${END}`,
  // Min-Width
  `${START}${MEDIA}min-w-.*${END}`,
  // Max-Width
  `${START}${MEDIA}max-w-(?!none).*${END}`,
  // Height
  `${START}${MEDIA}h-(?!screen|auto).*${END}`,
  // Min-Height
  `${START}${MEDIA}min-h-(?!screen).*${END}`,
  // Max-Height
  `${START}${MEDIA}max-h-(?!screen).*${END}`,
  // Font Size | Text Alignment | Text Color
  `${START}${MEDIA}text-(?!justify|current).*${END}`,
  // Font Style
  `${START}${MEDIA}(not-)?italic${END}`,
  // Font Style
  `${START}${MEDIA}font-(hairline|thin|light|normal|medium|semibold|bold|extrabold|black)${END}`,
  // Letter Spacing
  `${START}${MEDIA}tracking-.*${END}`,
  // Line Height
  `${START}${MEDIA}leading-(?!none|tight|snug|normal|relaxed|loose).*${END}`,
  // Text Transform
  `${START}${MEDIA}(uppercase|lowercase|capitalize|normal-case)${END}`,
  // Background Color
  `${START}${MEDIA}bg-(?!current|fixed|local|scroll|repeat|no-repeat|repeat-x|repeat-y|repeat-round|repeat-space|bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top|auto|cover|contain).*${END}`,
  // Border Radius
  `${START}${MEDIA}rounded-?.*${END}`,
  // Border Width | Border Color
  `${START}${MEDIA}border(-(?!collapse|separate|current|double|none).*)?${END}`,
  // Opacity
  `${START}${MEDIA}opacity-.*${END}`,
  // Cursor
  `${START}${MEDIA}cursor-.*${END}`,
  // User select
  `${START}${MEDIA}select-.*${END}`,
];
