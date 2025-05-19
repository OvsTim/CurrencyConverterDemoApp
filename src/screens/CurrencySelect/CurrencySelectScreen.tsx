import {useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {StaticScreenProps} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import data from '../../assets/currencies.json';
import {images} from '../../assets/images.ts';
import Pressable from '../../components/Pressable.tsx';
import {Text} from '../../components/Text.tsx';
import {ThrottledSearchInput} from '../../components/ThrottledSearchInput.tsx';
import {Currency} from '../../types/Currency.ts';
import {Colors} from '../../utils/colors.tsx';
type Props = StaticScreenProps<{
  code: string;
  type: 'from' | 'to';
}>;

const CurrencySelectScreen = ({route}: Props) => {
  const fullList = data;
  const insets = useSafeAreaInsets();
  const [currencies, setCurrencies] = useState<Currency[]>(fullList);

  const renderItem = ({item, index}: ListRenderItemInfo<Currency>) => {
    return (
      <Pressable
        onPress={() => {}}
        style={
          index === 0
            ? [styles.currContainer, styles.currContainerSelected]
            : styles.currContainer
        }>
        <View style={styles.currFlagNameRow}>
          <Image style={styles.flag} src={item.flagSrc} />
          <Text
            style={styles.currName}
            font={'MM16'}>{`${item.code} - ${item.name}`}</Text>
        </View>
        <Image
          style={styles.currRadioBtn}
          source={index === 0 ? images.radioCheck : images.radioUncheck}
        />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, {marginBottom: insets.bottom + 42}]}>
      <ThrottledSearchInput
        styleContainer={styles.search}
        value={''}
        placeholder={'USD'}
      />
      <View
        style={[styles.currListContainer, {marginBottom: insets.bottom + 42}]}>
        <FlatList
          overScrollMode={'never'}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          data={currencies}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default CurrencySelectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {height: 8},
  currListContainer: {
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: Colors.CURRENCY_LIST,
  },
  currName: {
    width: '80%',
  },
  currFlagNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    marginTop: 20,
  },
  currContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
  },
  currContainerSelected: {
    backgroundColor: Colors.ACTIVE,
  },
  currRadioBtn: {
    width: 16,
    height: 16,
  },
  flag: {
    width: 30,
    height: 20,
    borderColor: Colors.INPUT_BORDER,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 18,
  },
});
