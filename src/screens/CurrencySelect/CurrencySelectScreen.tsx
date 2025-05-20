import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {StaticScreenProps, useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useCurrencySelectController from './useCurrencySelectController.tsx';
import {images} from '../../assets/images.ts';
import Pressable from '../../components/Pressable.tsx';
import {Text} from '../../components/Text.tsx';
import {ThrottledSearchInput} from '../../components/ThrottledSearchInput.tsx';
import {useCurrenciesStore} from '../../store/CurrenciesStore.tsx';
import {Currency} from '../../types/Currency.ts';
import {Colors} from '../../utils/colors.tsx';
type Props = StaticScreenProps<{
  code: string;
  type: 'from' | 'to';
}>;

const CurrencySelectScreen = observer(({route}: Props) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {from, to, setFrom, setTo} = useCurrenciesStore();
  const {currencies, search, setSearch, onSearchChange} =
    useCurrencySelectController();

  const renderItem = ({item}: ListRenderItemInfo<Currency>) => {
    const currency = route.params.type === 'from' ? from : to;
    return (
      <Pressable
        onPress={() => {
          if (route.params.type === 'from') {
            setFrom(item);
          } else setTo(item);
          navigation.goBack();
        }}
        style={
          item.code === currency.code
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
          source={
            item.code === currency.code
              ? images.radioCheck
              : images.radioUncheck
          }
        />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, {marginBottom: insets.bottom + 42}]}>
      <ThrottledSearchInput
        styleContainer={styles.search}
        value={search}
        placeholder={'USD'}
        onTextChanges={setSearch}
        onThrottledChange={onSearchChange}
      />
      <View
        style={[styles.currListContainer, {marginBottom: insets.bottom + 42}]}>
        <FlatList
          overScrollMode={'never'}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListEmptyComponent={
            <Text style={styles.emptyPh} font={'MM16'} color={Colors.TEXT}>
              {'No items available'}
            </Text>
          }
          data={currencies}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
});

export default CurrencySelectScreen;

const styles = StyleSheet.create({
  emptyPh: {
    padding: 16,
    alignSelf: 'center',
  },
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
