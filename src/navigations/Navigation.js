import { useUserContext } from '../contexts/UserContext';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';

const Navigation = () => {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
