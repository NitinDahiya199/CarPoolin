import React from 'react';
import { SvgProps } from 'react-native-svg';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
import AccountOutline from './AccountOutline';
import AccountCircle from './AccountCircle';
import AccountGroup from './AccountGroup';
import AccountMultiple from './AccountMultiple';
import EmailOutline from './EmailOutline';
import LockOutline from './LockOutline';
import LockOpen from './LockOpen';
import EyeOutline from './EyeOutline';
import PhoneOutline from './PhoneOutline';
import Calendar from './Calendar';
import MapMarkerOutline from './MapMarkerOutline';
import MapMarkerPath from './MapMarkerPath';
import FlagOutline from './FlagOutline';
import SwapVertical from './SwapVertical';
import BriefcaseOutline from './BriefcaseOutline';
import SchoolOutline from './SchoolOutline';
import AirplaneTakeoff from './AirplaneTakeoff';
import ShoppingOutline from './ShoppingOutline';
import Magnify from './Magnify';
import Star from './Star';
import StarCircle from './StarCircle';
import HeartOutline from './HeartOutline';
import FilterVariant from './FilterVariant';
import Crown from './Crown';
import Car from './Car';
import CarMultiple from './CarMultiple';
import CarSports from './CarSports';
import CarInfo from './CarInfo';
import ShieldCheck from './ShieldCheck';
import CashFast from './CashFast';
import ClockFast from './ClockFast';
import ClockOutline from './ClockOutline';
import MessageText from './MessageText';
import CheckDecagram from './CheckDecagram';
import License from './License';
import Translate from './Translate';
import ThumbUp from './ThumbUp';
import Palette from './Palette';
import Sofa from './Sofa';
import CheckCircle from './CheckCircle';
import ChevronRight from './ChevronRight';
import ShareVariant from './ShareVariant';
import RoadVariant from './RoadVariant';
import Google from './Google';
import Facebook from './Facebook';
import Apple from './Apple';
import Leaf from './Leaf';
import Wifi from './Wifi';
import Snowflake from './Snowflake';
import Music from './Music';
import BatteryCharging from './BatteryCharging';

export interface IconProps extends SvgProps {
  size?: number;
  color?: string;
}

// Icon registry - maps icon names to components
const iconRegistry: Record<string, React.ComponentType<IconProps>> = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'account-outline': AccountOutline,
  'account-circle': AccountCircle,
  'account-group': AccountGroup,
  'account-multiple': AccountMultiple,
  'email-outline': EmailOutline,
  'lock-outline': LockOutline,
  'lock-open': LockOpen,
  'eye-outline': EyeOutline,
  'phone-outline': PhoneOutline,
  'calendar': Calendar,
  'map-marker-outline': MapMarkerOutline,
  'map-marker-path': MapMarkerPath,
  'flag-outline': FlagOutline,
  'swap-vertical': SwapVertical,
  'briefcase-outline': BriefcaseOutline,
  'school-outline': SchoolOutline,
  'airplane-takeoff': AirplaneTakeoff,
  'shopping-outline': ShoppingOutline,
  'magnify': Magnify,
  'star': Star,
  'star-circle': StarCircle,
  'heart-outline': HeartOutline,
  'filter-variant': FilterVariant,
  'crown': Crown,
  'car': Car,
  'car-multiple': CarMultiple,
  'car-sports': CarSports,
  'car-info': CarInfo,
  'shield-check': ShieldCheck,
  'cash-fast': CashFast,
  'clock-fast': ClockFast,
  'clock-outline': ClockOutline,
  'message-text': MessageText,
  'check-decagram': CheckDecagram,
  'license': License,
  'translate': Translate,
  'thumb-up': ThumbUp,
  'palette': Palette,
  'sofa': Sofa,
  'check-circle': CheckCircle,
  'chevron-right': ChevronRight,
  'share-variant': ShareVariant,
  'road-variant': RoadVariant,
  'google': Google,
  'facebook': Facebook,
  'apple': Apple,
  'leaf': Leaf,
  'wifi': Wifi,
  'snowflake': Snowflake,
  'music': Music,
  'battery-charging': BatteryCharging,
};

export const registerIcon = (name: string, component: React.ComponentType<IconProps>) => {
  iconRegistry[name] = component;
};

export const getIcon = (name: string): React.ComponentType<IconProps> | undefined => {
  return iconRegistry[name];
};

// Main Icon component - compatible with react-native-vector-icons API
const Icon: React.FC<{ name: string; size?: number; color?: string; style?: any }> = ({
  name,
  size = 24,
  color = '#000',
  style,
}) => {
  const IconComponent = getIcon(name);
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} color={color} style={style} />;
};

export default Icon;
