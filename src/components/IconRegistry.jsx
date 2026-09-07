import {
  Plane, PlaneTakeoff, PlaneLanding, Building2, Car, Luggage, Ticket,
  ShieldCheck, Receipt, Home, ScanFace, Navigation, CircleCheck,
  DoorOpen, Armchair, UtensilsCrossed, ShoppingBag, Bath, Stethoscope,
  Zap, ParkingSquare, IdCard, BookOpen, Stamp, FolderKey, CloudSun,
  CloudRain, Cloud, Sun, Snowflake, CloudLightning
} from 'lucide-react';

const ICON_MAP = {
  Plane, PlaneTakeoff, PlaneLanding, Building2, Car, Luggage, Ticket,
  ShieldCheck, Receipt, Home, ScanFace, Navigation, CircleCheck,
  DoorOpen, Armchair, UtensilsCrossed, ShoppingBag, Bath, Stethoscope,
  Zap, ParkingSquare, IdCard, BookOpen, Stamp, FolderKey, CloudSun,
  CloudRain, Cloud, Sun, Snowflake, CloudLightning,
};

/**
 * Resolve a Lucide icon name string to its React component.
 * Returns a rendered icon element or null.
 */
export const getIcon = (name, props = {}) => {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
};

export default ICON_MAP;
