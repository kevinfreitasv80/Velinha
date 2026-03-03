import { Text, TouchableOpacity, PressableProps } from "react-native";
import { LucideIcon } from "lucide-react-native";

interface BtnProps extends PressableProps {
  background?: string;
  textColor?: string | "black";
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  text: string;
  rounded?: number;
  borderSize?: number;
  borderColor?: string;
  icon?: LucideIcon;
  textSize?: number;
  func: () => void;
  /** Callback de som injetado pelo pai — chame playClick antes de func */
  onClickSound?: () => void;
}

export default function Button(props: BtnProps) {
  function handlePress() {
    props.onClickSound?.();
    props.func();
  }

  return (
    <TouchableOpacity
      style={{
        backgroundColor: props.background,
        borderColor: props.borderColor,
        borderWidth: props.borderSize,
        borderRadius: props.rounded,
        padding: props.padding,
        paddingVertical: props.paddingY,
        paddingHorizontal: props.paddingX,
      }}
      className="cursor-pointer flex-row items-center"
      onPress={handlePress}
    >
      {props.icon && <props.icon className="mr-3" color={"#fff"} />}
      <Text
        style={{
          fontFamily: "MontserratAlternates_700Bold",
          fontSize: props.textSize,
          color: props.textColor,
        }}
        className="text-center block"
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
