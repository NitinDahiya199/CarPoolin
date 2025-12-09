import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const FilterVariant: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6 13h12v-2H6v2zM3 6v2h18V6H3zm7 12h4v-2h-4v2z"
        fill={color}
      />
    </Svg>
  );
};

export default FilterVariant;

