import {Image, Keyboard, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useExchangeController from './useExchangeController.tsx';
import {images} from '../../assets/images.ts';
import CustomTextInput from '../../components/CustomTextInput.tsx';
import Pressable from '../../components/Pressable.tsx';
import {Text} from '../../components/Text.tsx';
import {Colors} from '../../utils/colors.tsx';

const ExchangeScreen = observer(() => {
  const insets = useSafeAreaInsets();
  const {
    lastCachedResponse,
    swapCurrencies,
    digitalAmount,
    to,
    from,
    amount,
    setAmount,
  } = useExchangeController();
  const navigation = useNavigation();

  const renderCurrencyButton = (type: 'to' | 'from') => {
    const currency = type === 'to' ? to : from;

    return (
      <Pressable
        onPress={() =>
          navigation.navigate('CurrencySelect', {type, code: currency.code})
        }
        style={styles.buttonRow}>
        <Image style={styles.flag} src={currency.flagSrc} />
        <Text font={'MM16'} color={Colors.TEXT}>
          {currency.code}
        </Text>
        <Image style={styles.chevron} source={images.chewronDown} />
      </Pressable>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      keyboardVerticalOffset={100}
      style={[styles.container, {paddingTop: insets.top}]}>
      <Pressable
        style={styles.topPressable}
        onPress={() => Keyboard.dismiss()}
        activeOpacity={1}>
        <View style={styles.inputsRow}>
          <View>
            <Text style={styles.label} font={'MM16'} color={Colors.TEXT}>
              {'From:'}
            </Text>
            {renderCurrencyButton('from')}
          </View>
          <Pressable
            onPress={() => swapCurrencies()}
            hitSlop={10}
            style={styles.swipeButton}>
            <Image style={styles.arrows} source={images.arrowsLeftRight} />
          </Pressable>
          <View>
            <Text style={styles.label} font={'MM16'} color={Colors.TEXT}>
              {'To:'}
            </Text>
            {renderCurrencyButton('to')}
          </View>
        </View>
        <Text style={styles.label} font={'MM16'} color={Colors.TEXT}>
          {'Amount:'}
        </Text>
        <CustomTextInput
          inputProps={{keyboardType: 'decimal-pad'}}
          onTextChanges={setAmount}
          value={amount}
          placeholder={'1'}
        />
        <Text style={styles.topCurrText} font={'MM16'} color={Colors.TEXT}>
          {`${digitalAmount}$ =`}
        </Text>
        <Text font={'MM42'} color={Colors.TEXT}>
          {lastCachedResponse?.rates && lastCachedResponse.rates[to.code]
            ? `${(digitalAmount * lastCachedResponse.rates[to.code])
                .toFixed(2)
                .replace('.', ',')} ${to.code}`
            : `0${to.code}`}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
});

export default ExchangeScreen;

const styles = StyleSheet.create({
  topPressable: {
    flex: 1,
    justifyContent: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 16,
  },
  topCurrText: {marginTop: 24},
  swipeButton: {alignSelf: 'flex-end', marginBottom: 15},
  flag: {
    width: 30,
    height: 20,
    borderColor: Colors.INPUT_BORDER,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 18,
  },
  buttonRow: {
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.ACTIVE,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  chevron: {
    marginLeft: 17.5,
    width: 18,
    height: 18,
  },
  arrows: {
    width: 18,
    height: 18,
  },
  label: {
    marginBottom: 8,
  },
});
