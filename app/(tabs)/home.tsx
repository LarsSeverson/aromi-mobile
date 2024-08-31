import Home from "@/components/Home/Home"
import { SafeAreaView } from "react-native-safe-area-context"

const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Home />
    </SafeAreaView>
  )
}

export default HomePage