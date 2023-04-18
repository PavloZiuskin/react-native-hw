import { TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { pallete } from "../helpers/variables";

export function LogOut({ styles }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles}
      onPress={() => alert("Log out from your acount NEW")}
    >
      <FontAwesome name="sign-out" size={24} color={pallete.gray} />
    </TouchableOpacity>
  );
}
