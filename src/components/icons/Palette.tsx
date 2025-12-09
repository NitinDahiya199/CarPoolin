import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './Icon';

const Palette: React.FC<IconProps> = ({ size = 24, color = '#000', ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zM5.5 7C6.33 7 7 7.67 7 8.5S6.33 10 5.5 10 4 9.33 4 8.5 4.67 7 5.5 7zm3 4C9.33 11 10 10.33 10 9.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm6-4c.83 0 1.5.67 1.5 1.5S15.33 10 14.5 10 13 9.33 13 8.5 13.67 7 14.5 7zm3 4c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"
        fill={color}
      />
    </Svg>
  );
};

export default Palette;

