import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { BLACK, GRAY, PRIMARY } from '../Colors';
import { forwardRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const KeyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
};

export const ReturnKeyTypes = {
  DEFAULT: 'return',
  DONE: 'done',
  NEXT: 'next',
};

export const TextContentTypes = {
  DEFAULT: 'none',
  EMAIL: 'emailAddress',
  PASSWORD: 'password',
};

export const SecureTextEntries = {
  DEFAULT: false,
  TRUE: true,
};

export const IconNames = {
  EMAIL: 'email',
  PASSWORD: 'lock',
};

const Input = forwardRef(
  ({ title, placeholder, value, iconName, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            value && styles.hasValueTitle,
            isFocused && styles.focusedTitle,
          ]}
        >
          {title}
        </Text>

        <View>
          <TextInput
            {...props}
            ref={ref}
            value={value}
            style={[
              styles.input,
              value && styles.hasValueInput,
              isFocused && styles.focusedInput,
            ]}
            placeholder={placeholder ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            autoCapitalize="none"
            autoCorrect={false}
            //keyboardType={keyboardType}
            //returnKeyType={returnKeyType}
            //textContentType={textContentType}
            //secureTextEntry={secureTextEntry}
            keyboardAppearance="default"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <View style={styles.icon}>
            <MaterialCommunityIcons
              name={iconName}
              size={20}
              color={(() => {
                switch (true) {
                  case isFocused:
                    return PRIMARY.DEFAULT;
                  case !!value:
                    return BLACK;
                  default:
                    return GRAY.DEFAULT;
                }
              })()}
            />
          </View>
        </View>
      </View>
    );
  }
);

Input.displayName = 'Input';

Input.defaultProps = {
  keyboardType: KeyboardTypes.default,
  returnKeyType: ReturnKeyTypes.default,
  textContentType: TextContentTypes.default,
  secureTextEntry: SecureTextEntries.default,
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.oneOf(Object.values(KeyboardTypes)),
  returnKeyType: PropTypes.oneOf(Object.values(ReturnKeyTypes)),
  textContentType: PropTypes.oneOf(Object.values(TextContentTypes)),
  secureTextEntry: PropTypes.bool,
  value: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(IconNames)),
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  title: {
    marginBottom: 4,
    color: GRAY.DEFAULT,
  },

  focusedTitle: {
    fontWeight: '600',
    color: PRIMARY.DEFAULT,
  },

  hasValueTitle: {
    color: BLACK,
  },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    borderColor: GRAY.DEFAULT,
    paddingLeft: 30,
  },

  focusedInput: {
    borderWidth: 2,
    borderColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },

  hasValueInput: {
    borderColor: BLACK,
    color: BLACK,
  },

  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },
});

export default Input;
