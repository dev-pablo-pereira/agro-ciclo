import { Button, Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native'

interface CustomButtomProps {
    title: string;
    icon?: string
    type?: string
    onPress: () => void
}

export default function CustomButtom({title, icon, type, onPress} : CustomButtomProps) {
    return (
         <Button
          onPress={ onPress }
          title={title}
          icon={icon ? <Icon name={icon} type={type} color="white" /> : undefined}
          iconRight={true}
          containerStyle={styles.container}
          buttonStyle={styles.button}
          titleStyle={styles.title} />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '70%'
    },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  title: {
    marginRight: '20%',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
})