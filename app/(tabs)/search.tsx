import Search from "@/components/Search/Search"
import { SafeAreaView } from "react-native-safe-area-context"

export default function SearchPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Search />
    </SafeAreaView>
  )
}