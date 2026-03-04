import type { PokemonDetails, PokemonListResponse } from "@/src/type/pokemon";
const baseUrl = "https://pokeapi.co/api/v2";
const SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
export async function getPokemonList({
    limit = 10,
    offset = 0
} ) {
    
    const url = `${baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const data : PokemonListResponse = await res.json();
    return data.results;
}

export async function fetchPokemonDetails(id: string): Promise<PokemonDetails> {
  const res = await fetch(`${baseUrl}/pokemon/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon details: ${res.status}`);
  }
  // INSERT_YOUR_CODE
  // Add a short artificial delay before returning the details (e.g. simulate network)
  if (__DEV__) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return res.json();
}

export function getPokemonId(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function getPokemonSpriteUrl(id: string): string {
  return `${SPRITE_URL}/${id}.png`;
}