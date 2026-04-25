import { useFonts } from "expo-font";
import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_700Bold
} from "@expo-google-fonts/bricolage-grotesque";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { PlaywriteBR_400Regular } from "@expo-google-fonts/playwrite-br";

export function useAppFonts() {
  return useFonts({
    BricolageGrotesque: BricolageGrotesque_400Regular,
    BricolageGrotesqueBold: BricolageGrotesque_700Bold,
    Inter: Inter_400Regular,
    InterMedium: Inter_500Medium,
    InterSemiBold: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    PlaywriteBrasil: PlaywriteBR_400Regular
  });
}
