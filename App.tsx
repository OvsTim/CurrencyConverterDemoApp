import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CurrencySelectScreen from './src/screens/CurrencySelect/CurrencySelectScreen.tsx';
import ExchangeScreen from './src/screens/Exchange/ExchangeScreen.tsx';
import {Colors} from './src/utils/colors.tsx';
import {fonts} from './src/utils/fonts.ts';

const RootStack = createStackNavigator({
  screens: {
    Exchange: {
      screen: ExchangeScreen,
      options: {
        headerShown: false,
      },
    },
    CurrencySelect: {
      screen: CurrencySelectScreen,
      options: {
        title: 'Currency Select',
        headerTitleStyle: {...fonts.MM20_700},
        headerTitleAlign: 'left',
        headerBackButtonDisplayMode: 'minimal',
        headerShadowVisible: false,
        headerBackImageSource: require('./src/assets/images/arrow-left.png'),
        headerTintColor: Colors.TEXT,
      },
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <Navigation />
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
