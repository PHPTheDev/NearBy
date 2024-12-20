import { View, Text, Alert } from "react-native";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { Categories, type CategoriesProps } from "../components/categories";
import type { PlaceProps } from "../components/place";
import { Places } from "../components/places";

type MarketProps = PlaceProps;

export default function Home() {
	const [categories, setCategories] = useState<CategoriesProps>([]);
	const [category, setCategory] = useState("");
	const [markets, setMarkets] = useState<MarketProps[]>([]);

	async function fetchCategories() {
		try {
			const { data } = await api.get("/categories");
			console.log(data);
			setCategories(data);
			setCategory(data[0].id);
		} catch (error) {
			console.log(error);
			Alert.alert("Categorias", "Não foi possível carregar as categorias");
		}
	}

	async function fetchMarkets() {
		try {
			if (!category) {
				return null;
			}
			const { data } = await api.get(`/markets/category/${category}`);
			console.log(data);
			setMarkets(data);
		} catch (error) {
			console.log(error);
			Alert.alert("Locais", "Não foi possível carregar os locais");
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchCategories();
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchMarkets();
	}, [category]);

	return (
		<View style={{ flex: 1, backgroundColor: "#CECECE" }}>
			<Categories
				data={categories}
				onSelect={setCategory}
				selected={category}
			/>

			<Places data={markets} />
		</View>
	);
}
