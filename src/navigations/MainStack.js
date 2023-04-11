import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderLeftButton from '../components/HeaderLeftButton';
import HeaderRightButton from '../components/HeaderRightButton';
import ListScreen from '../screens/ListScreen';
import SettingScreen from '../screens/SettingScreen';
import { PRIMARY, WHITE } from '../Colors';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: WHITE },
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerStyle: {
          fontWeight: '700',
        },
        headerLeft: HeaderLeftButton,
      }}
    >
      <Stack.Screen
        name="List"
        component={ListScreen}
        options={{
          title: 'TODO List',
          headerTintColor: PRIMARY.DEFAULT,
          headerTitleStyle: { fontWeight: '700' },
          headerRight: HeaderRightButton,
        }}
      />

      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
