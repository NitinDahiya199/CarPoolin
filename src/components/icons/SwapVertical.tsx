import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const SwapVertical: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"
        fill={color}
      />
    </Svg>
  );
};

export default SwapVertical;

