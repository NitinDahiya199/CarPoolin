import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const StarCircle: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86l-1.77 4.69-4.69.54 3.75-3.12-1.76-4.71L12 8.5l2.86 2.4-1.76 4.71 3.75 3.12-4.69-.54-1.76-4.69z"
        fill={color}
      />
    </Svg>
  );
};

export default StarCircle;

