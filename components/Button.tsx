import { View, Text } from "react-native";
import { Icon, IconNode } from "lucide-react-native";

type BtnProps = {
  color: string;
  text: string;
  icon?: IconNode;
  textSize?: number;
};

export default function Button(props: BtnProps) {
  return (
    <View style={{ backgroundColor: props.color }} className="cursor-pointer">
      {/* <Icon iconNode={props.icon} /> */}
      <Text
        style={{
          fontFamily: "MontserratAlternates_700Bold",
          fontSize: props.textSize,
        }}
        className="text-white text-center block"
      >
        {props.text}
      </Text>
    </View>
  );
}
