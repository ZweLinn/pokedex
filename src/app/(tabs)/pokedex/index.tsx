import {
  getPokemonId,
  getPokemonList,
  getPokemonSpriteUrl,
} from "@/src/lib/poke-api";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type PokemonListItem = {
  name: string;
  url: string;
};

const TYPE_COLORS: Record<string, string> = {
  fire: "#FF6B35",
  water: "#4FC3F7",
  grass: "#66BB6A",
  electric: "#FFD54F",
  psychic: "#F48FB1",
  ice: "#80DEEA",
  dragon: "#7E57C2",
  dark: "#546E7A",
  fairy: "#F8BBD9",
  normal: "#BDBDBD",
  fighting: "#EF5350",
  flying: "#90CAF9",
  poison: "#AB47BC",
  ground: "#D4A76A",
  rock: "#A5978B",
  bug: "#AED581",
  ghost: "#7B1FA2",
  steel: "#78909C",
};

export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  const loadPokemon = async (currentOffset: number, replace = false) => {
    try {
      const results = await getPokemonList({
        limit: LIMIT,
        offset: currentOffset,
      });
      setPokemon((prev) => (replace ? results : [...prev, ...results]));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadPokemon(0, true);
  }, []);

  const loadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const newOffset = offset + LIMIT;
    setOffset(newOffset);
    loadPokemon(newOffset);
  };

  const renderItem = ({ item }: { item: PokemonListItem }) => {
    const id = getPokemonId(item.url);
    const sprite = getPokemonSpriteUrl(id);
    const paddedId = `#${id.padStart(3, "0")}`;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.75}
        onPress={() =>
          router.push({
            pathname: "/(tabs)/pokedex/[id]" as const,
            params: { id },
          })
        }
      >
        <View style={styles.cardInner}>
          <View style={styles.idBadge}>
            <Text style={styles.idText}>{paddedId}</Text>
          </View>
          <Image
            source={{ uri: sprite }}
            style={styles.sprite}
            resizeMode="contain"
          />
          <Text style={styles.pokeName}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#EF5350" />
        <Text style={styles.loadingText}>Loading Pokédex…</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#CC0000" />
      <View style={styles.header}>
        <View style={styles.headerDot} />
        <Text style={styles.headerTitle}>Pokédex</Text>
      </View>
      <FlatList
        data={pokemon}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ marginVertical: 16 }} color="#EF5350" />
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  header: {
    backgroundColor: "#CC0000",
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  headerDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#333",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  list: {
    padding: 12,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "48%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    overflow: "hidden",
  },
  cardInner: {
    padding: 12,
    alignItems: "center",
  },
  idBadge: {
    alignSelf: "flex-end",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  idText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
  },
  sprite: {
    width: 90,
    height: 90,
    marginVertical: 4,
  },
  pokeName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginTop: 4,
    textAlign: "center",
    letterSpacing: 0.3,
  },
});
