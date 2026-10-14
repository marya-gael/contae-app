import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
    <Stack.Screen options={{ title: 'Página não encontrada'}} />
    <View style={styles.container}>
      <Text>Página não encontrada</Text>
      <Link href="/" style={styles.button}>Início</Link>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#021123",
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'none',
    color: "#fff",
  }
});