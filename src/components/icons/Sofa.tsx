import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const Sofa: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M7 11h10v2h2V9c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v4h2v-2zm8.5 4H19v-2h-3.5v2zm-9 0H5v-2h1.5v2zM20 13h-2v2h2v-2zm-2-4V7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h2v2h12v-2h2c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2h-2zM8 7h8v2H8V7z"
        fill={color}
      />
    </Svg>
  );
};

export default Sofa;

