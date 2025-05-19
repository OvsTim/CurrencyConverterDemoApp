import {StyleSheet} from 'react-native';
export type FontsTypes = keyof typeof fonts;

export const fonts = StyleSheet.create({
  MM16: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
  },
  MM42: {
    fontFamily: 'Inter-Regular',
    fontSize: 42,
    fontWeight: '400',
    lineHeight: 50,
  },
  MM20_700: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
});
