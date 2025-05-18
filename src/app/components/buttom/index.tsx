import { Button, Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

interface CustomButtomProps {
    title: string;
    icon: string
    type?: string
}

export default function CustomButtom({title, icon, type} : CustomButtomProps) {
  const router = useRouter();
    return (
         <Button
          onPress={ () => router.navigate('/home') }
          title={title} 
          icon={<Icon name={icon} type={type} color="white" />}
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