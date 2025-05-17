import { View, StyleSheet} from "react-native";
import { Button, Input } from '@rneui/themed';

import "./global.css"


export default function App() {
  return (
    <View style={{display: "flex", flex: 1, justifyContent: "center", alignItems: "center"}}>
       <Input placeholder="Joanzinho" label="Nome"/>
       <Input placeholder="Senha" label="Senha" rightIcon={{type: 'MaterialIcons', name: 'visibility'}} />
       <Button title="Solid" />
    </View>
  );
}
