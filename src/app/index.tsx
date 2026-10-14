import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Contae App</Text>
      <Link href="/sobre" style={styles.button}>sobre</Link>
    </View>
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
