import {Ref, useRef} from 'react';
import {
  TextInput,
  ViewStyle,
  TextInputProps,
  useWindowDimensions,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Colors} from '../utils/colors.tsx';

type Props = {
  value: string;
  onTextChanges: (term: string) => void;
  styleInput?: ViewStyle;
  styleContainer?: ViewStyle;
  editable?: boolean;
  placeholder: string;
  inputProps?: TextInputProps;
  showClose?: boolean;
  inputRef?: Ref<TextInput>;
};
export default function BaseInput(props: Props) {
  const {width} = useWindowDimensions();
  const localRef = useRef<TextInput>(null);

  return (
    <Pressable
      onPress={() => {
        if (props.inputRef) {
          props.inputRef.current?.focus();
        } else {
          localRef.current?.focus();
        }
      }}
      style={[
        {
          width: width - 40,
        },
        styles.inputContainer,
        props.styleContainer,
      ]}>
      <TextInput
        editable={props.editable}
        ref={props.inputRef ? props.inputRef : localRef}
        style={[styles.input, props.styleInput]}
        submitBehavior={'blurAndSubmit'}
        onChangeText={props.onTextChanges}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.PLACEHOLDER}
        underlineColorAndroid={'rgba(0,0,0,0)'}
        {...props.inputProps}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-color-literals
  input: {
    backgroundColor: 'transparent',
    color: Colors.TEXT,
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 0,
    width: '100%',
  },
  inputContainer: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderColor: Colors.INPUT_BORDER,
    borderRadius: 8,
    borderWidth: 2,
    height: 43,
    justifyContent: 'center',
  },
});
