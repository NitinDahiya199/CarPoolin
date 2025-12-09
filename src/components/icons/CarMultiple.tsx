import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const CarMultiple: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm9-9h-3V5.5c0-.83-.67-1.5-1.5-1.5S12 4.67 12 5.5V8H5.5C4.67 8 4 8.67 4 9.5v7.15c0 .41.34.75.75.75s.75-.34.75-.75V13h12v3.65c0 .41.34.75.75.75s.75-.34.75-.75V9.5c0-.83-.67-1.5-1.5-1.5zM6.5 17c-.83 0-1.5-.67-1.5-1.5S5.67 14 6.5 14s1.5.67 1.5 1.5S7.33 17 6.5 17zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM18 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        fill={color}
      />
    </Svg>
  );
};

export default CarMultiple;

