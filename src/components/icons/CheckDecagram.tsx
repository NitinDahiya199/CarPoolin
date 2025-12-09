import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const CheckDecagram: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.69L23 12zm-10 5l-3-3 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z"
        fill={color}
      />
    </Svg>
  );
};

export default CheckDecagram;

