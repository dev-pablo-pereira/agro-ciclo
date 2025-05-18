import { View, StyleSheet } from "react-native";
import CustomButtom from "./components/buttom";
import CardArea from "./components/cardArea";

export default function Home() {
    return(
        <View style={styles.container}>
            <CustomButtom title="Nova Área" icon="plus" type="entypo"/>
            <CardArea title="Área 1" dimension="60" color="#CFB8B8"/>
            <CardArea title="Área 2" dimension="70" color="#CFB858"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})