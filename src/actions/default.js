import icons from "../icons";

export default [
  {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
  {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
  {type: "entity", label: "Link", style: "link", icon: icons.LinkIcon},
  {type: "separator"},
  {type: "block", label: "UL", style: "unordered-list-item", icon: icons.ULIcon},
  {type: "block", label: "OL", style: "ordered-list-item", icon: icons.OLIcon},
  {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon},
  {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
];
