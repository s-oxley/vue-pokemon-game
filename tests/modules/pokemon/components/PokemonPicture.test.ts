import PokemonPicture from "@/modules/pokemon/components/PokemonPicture.vue";
import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils';

describe('<PokemonPicture />', () => {
    test('Render component PokemonPicture show pokemon', () => {
        const wrapper = mount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: true,
            },
        });
        const img = wrapper.find('img');
        expect(img.exists()).toBeTruthy();
        expect(img.classes()).toEqual(['fade-in', 'h-[200px]'])
        expect(img.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg')
    })

    test('Render component PokemonPicture hide pokemon', () => {
        const wrapper = mount(PokemonPicture, {
            props: {
                pokemonId: 2,
                showPokemon: false,
            },
        });
        const img = wrapper.find('img');
        expect(img.exists()).toBeTruthy();
        expect(img.attributes()).toEqual(
            expect.objectContaining({
                src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
                class: 'brightness-0 h-[200px]'
            })
        )
    })
})
