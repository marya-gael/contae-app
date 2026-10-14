import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Contae App</Text>
      <Link href="/" style={styles.button}>Inicio</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6098db",
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'none',
    color: "#fff",
  }
});
