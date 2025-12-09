import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const Leaf: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66c.81-2.34 1.89-4.15 3.07-5.5C11.5 15.5 13.5 15 15 15c0-4.42-3.58-8-8-8S-1 2.58-1 7c0 1.79.73 3.42 1.91 4.59L1 14l2.5-2.5C4.5 10.5 6 10 7.5 10c1.5 0 3 .5 4.5 1.5 1.35.89 2.92 1.5 4.5 1.5 0-1.66.67-3.16 1.75-4.25C19.42 7.67 18.21 8 17 8z"
        fill={color}
      />
    </Svg>
  );
};

export default Leaf;

