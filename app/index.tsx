import { Character } from "@/components/Candle/Character";
import { StyleSheet, View } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Character isBlink={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});