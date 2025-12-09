import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const RoadVariant: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M11.16 4.36L11.5 2h1l.34 2.36c-.43.07-.85.18-1.26.32l-.22-.32zM18.5 11.5c.07-.43.18-.85.32-1.26l-.32-.22-2.36.34v1l2.36.34c-.14-.41-.25-.83-.32-1.26zM20.5 16h-2l-.34-2.36c.43-.07.85-.18 1.26-.32l.22.32c.14.41.25.83.32 1.26zM13 22h-2l-.34-2.36c.43-.07.85-.18 1.26-.32l.22.32c.14.41.25.83.32 1.26zM5.5 11.5c-.07.43-.18.85-.32 1.26l.32.22 2.36-.34v-1l-2.36-.34c.14.41.25.83.32 1.26zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
        fill={color}
      />
    </Svg>
  );
};

export default RoadVariant;

