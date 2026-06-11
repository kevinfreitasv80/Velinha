import { useRef } from "react";
import { Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

export default function Confetti() {
    const refConfetti = useRef(null);

    function startAnimation() {
        if (refConfetti.current) refConfetti.current.start();
    }

    function stopAnimation() {
        if (refConfetti.current) refConfetti.current.stop();
    }

    return (
        <View style={{ position: "absolute", left: 0, bottom: 0 }}>
            <ConfettiCannon count={200} autoStart={true} origin={{ x: -100, y: 0 }} ref={refConfetti} />
            <Text>Oiiii</Text>
        </View>
    )
}