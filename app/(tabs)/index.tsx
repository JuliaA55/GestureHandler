import { StyleSheet,View } from 'react-native';
import Deck from '../Deck';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function HomeScreen() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
      <Deck />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d11717',
  },
});
