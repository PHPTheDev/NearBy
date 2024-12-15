import { Text, Pressable, type PressableProps } from "react-native";
import { s } from "./style";
import { categoriesIcons } from "../../utils/categories-icons";
import { colors } from "../../styles/colors";

type CategoryProps = PressableProps & {
	iconId: string;
	isSelected?: boolean;
	name: string;
};
export const Category = ({
	name,
	iconId,
	isSelected = false,
	...rest
}: CategoryProps) => {
	const Icon = categoriesIcons[iconId];
	return (
		<Pressable
			style={[s.container, isSelected && s.containerSelected]}
			{...rest}
		>
			<Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
			<Text style={[s.name, isSelected && s.nameSelected]}>{name}</Text>
		</Pressable>
	);
};