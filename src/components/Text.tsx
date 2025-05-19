import {FC} from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {FontsTypes, fonts} from '../utils/fonts.ts';

type Props = TextProps & {
  color?: string;
  font?: FontsTypes;
};

export const Text: FC<Props> = props => {
  return (
    <RNText
      {...props}
      style={[
        props.style,
        {color: props.color},
        props.font && fonts[props.font],
      ]}
    />
  );
};
