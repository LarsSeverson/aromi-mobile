import Welcome from "@/components/OnBoarding/Welcome"
import { View } from "react-native"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Welcome />
    </View>
  );
}
