import Button from "@/components/Button";
import { Character } from "@/components/Candle/Character";
import { useState } from "react";

import { StyleSheet, View } from "react-native";

export default function Home() {
    const [start, setStart] = useState(false);

    return (
        <View style={styles.container}>
            <Character isBlink={false} />
            <View style={styles.containerButtons}>
                <Button
                    text={start ? "Pause" : "Start"}
                    background={start ? "rgb(201, 201, 16)" : "#0f0"}
                    textSize={20}
                    textColor="#fff"
                    paddingX={20}
                    paddingY={10}
                    rounded={999}
                    func={() => {
                        setStart(prev => !prev)
                    }}
                />
                <Button
                    text="Stop"
                    background="#f00"
                    textSize={20}
                    textColor="#fff"
                    paddingX={20}
                    paddingY={10}
                    rounded={999}
                    func={() => {
                        setStart(false)
                    }}
                />
            </View>
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
    containerButtons: {
        flexDirection: "row",
        marginTop: 20
    }
});