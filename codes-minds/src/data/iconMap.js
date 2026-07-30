import {
  Code2,
  Globe,
  Palette,
  PenTool,
  Video,
  ShoppingCart,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// Keys must match the "icon" keyword strings stored in the backend Service model
// (see backend src/utils/seed.js)
const iconMap = {
  code: Code2,
  globe: Globe,
  palette: Palette,
  "pen-tool": PenTool,
  video: Video,
  "shopping-cart": ShoppingCart,
  "trending-up": TrendingUp,
  shield: ShieldCheck,
};

// Options shown in the admin "icon" dropdown when creating/editing a service
export const iconOptions = Object.keys(iconMap);

export function getIcon(name) {
  return iconMap[name] || Sparkles;
}

export default iconMap;
