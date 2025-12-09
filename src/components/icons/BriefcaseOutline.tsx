import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const BriefcaseOutline: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M10 4h4v2h-4V4zm9 5v11c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h3V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v3h3c1.1 0 2 .9 2 2zm-2 0H7v11h10V9zm-7-5v3h4V4h-4z"
        fill={color}
      />
    </Svg>
  );
};

export default BriefcaseOutline;

