import {FC, Ref, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  ViewStyle,
  TextInputProps,
  Pressable,
  useWindowDimensions,
  StyleSheet,
  Image,
} from 'react-native';
import {images} from '../assets/images.ts';
import {Colors} from '../utils/colors.tsx';
import {fonts} from '../utils/fonts';

type Props = {
  value: string;
  throttle?: number;
  onThrottledChange?: (term: string) => void;
  onTextChanges?: (term: string) => void;
  styleInput?: ViewStyle;
  styleContainer?: ViewStyle;
  showClearIcon?: boolean;
  showSearchIcon?: boolean;
  placeholder?: string;
  inputProps?: TextInputProps;
  inputRef?: Ref<TextInput>;
};

const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        func(...args);
      }, wait);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        func(...args);
      }, wait);
    }
  };
};

export const ThrottledSearchInput: FC<Props> = props => {
  const {width} = useWindowDimensions();

  const throttled = useRef(
    props.onThrottledChange
      ? throttle(
          (term: string) =>
            props.onThrottledChange ? props.onThrottledChange(term) : () => {},
          props.throttle || 300,
        )
      : null,
  );

  const [value, setValue] = useState<string>(props.value);

  useEffect(() => {
    console.log('Value', value);
    throttled.current && throttled.current(value);
  }, [value]);

  const handleInput = useCallback(
    (input: string) => {
      console.log('Input', input);
      props.onTextChanges && props.onTextChanges(input);
      setValue(input);
    },
    [props],
  );

  const renderSearchIcon = () => {
    if (!props.showSearchIcon && !props.showClearIcon) {
      return null;
    }

    return (
      <Pressable
        onPress={() => {
          setValue('');
          if (props.onTextChanges) {
            props.onTextChanges('');
          }
        }}
        style={styles.searchIconContainer}>
        {props.showSearchIcon && value === '' ? <View /> : <View />}
      </Pressable>
    );
  };

  return (
    <View
      style={[
        {
          width: width - 40,
        },
        styles.container,
        props.styleContainer,
      ]}>
      <Image style={styles.iconSearch} source={images.search} />
      <TextInput
        ref={props.inputRef}
        style={[styles.textInput, props.styleInput, fonts.MM16]}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.PLACEHOLDER}
        onChangeText={handleInput}
        {...props.inputProps}
        value={value}
        underlineColorAndroid={'rgba(0,0,0,0)'}
      />
      {renderSearchIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderColor: Colors.INPUT_BORDER,
    borderRadius: 8,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  iconSearch: {
    position: 'absolute',
    width: 18,
    height: 18,
    left: 16,
  },
  searchIconContainer: {
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 12,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textInput: {
    color: Colors.TEXT,
    fontSize: 16,
    paddingLeft: 42,
    paddingRight: 42,
    width: '100%',
    height: 43,
    alignSelf: 'center',
  },
});
