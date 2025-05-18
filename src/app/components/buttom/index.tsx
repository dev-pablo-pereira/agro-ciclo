import { Button, Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native'

interface CustomButtomProps {
    title: string;
    iconName: string
}

export default function CustomButtom({title, iconName} : CustomButtomProps) {
    return (
         <Button title={title} 
         icon={<Icon name={iconName} color="white" />}
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