import { TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { pallete } from "../helpers/variables";

export function CustomGoBack({ goBack }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        marginLeft: 16,
      }}
      onPress={() => goBack()}
    >
      <FontAwesome name="long-arrow-left" size={24} color={pallete.softBlack} />
    </TouchableOpacity>
  );
}
