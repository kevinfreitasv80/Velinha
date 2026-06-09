import { StyleSheet, Text, View } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Guilherme</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white",
        fontSize: 30
    }
});