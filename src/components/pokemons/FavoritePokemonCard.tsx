import type { FavoritePokemon } from "@interfaces/favorite-pokemons"
import { createSignal, Show, type Component } from "solid-js";

interface Props {
    pokemon: FavoritePokemon;
}
export const FavoritePokemonCard: Component<Props> = ({ pokemon }) => {

    const [isVisible, setIsVisible] = createSignal(true);

    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

    const deleteFavorite = () => {
        const favorites = JSON.parse(
            localStorage.getItem('favorites') ?? '[]'
        ) as FavoritePokemon[];

        const newFavorites = favorites.filter(pokemon => pokemon.id !== pokemon.id);

        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsVisible(false);
    };



    return (
        <Show when={isVisible()}>
            <div class="flex flex-col justify-center items-center">
                <a href={`/pokemons/${pokemon.name}`}>
                    <img
                        src={imgSrc}
                        alt={pokemon.name}
                        width='96px'
                        height='96px'
                        style={`view-transition-name: ${pokemon.name}-image`}
                    />
                    <p class="capitalize"> #{pokemon.id} {pokemon.name}</p>
                </a>
                <button class="text-red-400" onClick={deleteFavorite}>
                    Borrar
                </button>
            </div>
        </Show>
    );
};
