import { Input, Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native';

interface CustomInputProps {
  placeholder?: string;
  label: string;
  secureText?: boolean;
  iconType?: string;
  iconName?: string;
}

export default function CustomInput({
  placeholder,
  label,
  iconType,
  iconName,
  secureText,
}: CustomInputProps) {
  return (
    <Input
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        rightIconContainerStyle={styles.icon}
        labelStyle={styles.label}
        placeholderTextColor={'white'}
        placeholder={placeholder}
        label={label}
        secureTextEntry={secureText}
        rightIcon={
            iconType && iconName ? (
                <Icon
                    type={iconType}
                    name={iconName}
                    color={'white'}
                />
            ) : undefined
        }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%'
  },
  inputContainer: {
    backgroundColor: '#8D6E63',
    borderBottomWidth: 0,
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 10,
  },
  label: {
    color: '#333333',
    fontSize: 20,
    marginBottom: 4
  },
  input: {
    color: 'white',
    height: 50,
  },
  icon: {
    backgroundColor: '#8D6E63',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 8,
  }
});
