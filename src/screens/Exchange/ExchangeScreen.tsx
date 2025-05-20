import {Image, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images.ts';
import CustomTextInput from '../../components/CustomTextInput.tsx';
import Pressable from '../../components/Pressable.tsx';
import {Text} from '../../components/Text.tsx';
import {useCurrenciesStore} from '../../store/CurrenciesStore.tsx';
import {Colors} from '../../utils/colors.tsx';

const ExchangeScreen = observer(() => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {to, from} = useCurrenciesStore();

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
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.inputsRow}>
        <View>
          <Text style={styles.label} font={'MM16'} color={Colors.TEXT}>
            {'From:'}
          </Text>
          {renderCurrencyButton('from')}
        </View>
        <Pressable hitSlop={10} style={styles.swipeButton}>
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
      <CustomTextInput onTextChanges={() => {}} value={''} placeholder={'1'} />
      <Text style={styles.topCurrText} font={'MM16'} color={Colors.TEXT}>
        {'1$ ='}
      </Text>
      <Text font={'MM42'} color={Colors.TEXT}>
        {'3,98 zł'}
      </Text>
    </View>
  );
});

export default ExchangeScreen;

const styles = StyleSheet.create({
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
