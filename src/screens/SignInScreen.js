import { Alert, Image, StyleSheet, View, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input, {
  KeyboardTypes,
  ReturnKeyTypes,
  TextContentTypes,
  SecureTextEntries,
  IconNames,
} from '../components/Input';
import Button from '../components/Button';
import SafeInputView from '../components/SafeInputView';
import { useRef, useState, useEffect } from 'react';
import { signIn } from '../api/auth';
import { useUserContext } from '../contexts/UserContext';

const SignInScreen = () => {
  const insets = useSafeAreaInsets();

  const { setUser } = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const onSubmit = async () => {
    if (!isLoading && !disabled) {
      try {
        setIsLoading(true);
        Keyboard.dismiss();
        const data = await signIn(email, password);
        setIsLoading(false);
        setUser(data);
      } catch (error) {
        Alert.alert('Login failed', error, [
          { text: '확인', onPress: () => setIsLoading(false) },
        ]);
      }
    }
  };

  //console.log(email, password);

  return (
    <SafeInputView>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <Image source={require('../../assets/main.png')} style={styles.image} />
        <Input
          title={'E-mail'}
          placeholder="your@email.com"
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          textContentType={TextContentTypes.EMAIL}
          secureTextEntry={SecureTextEntries.DEFAULT}
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          ref={passwordRef}
          title={'Password'}
          placeholder="Password"
          returnKeyType={ReturnKeyTypes.DONE}
          textContentType={TextContentTypes.PASSWORD}
          secureTextEntry={SecureTextEntries.TRUE}
          value={password}
          onChangeText={(password) => setPassword(password.trim())}
          iconName={IconNames.PASSWORD}
          onSubmitEditing={onSubmit}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default SignInScreen;
