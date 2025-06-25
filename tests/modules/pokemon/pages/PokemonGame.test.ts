import { describe, test, expect, vi } from "vitest";
import type { Mock } from 'vitest';
import { mount } from '@vue/test-utils';
import PokemonGame from "@/modules/pokemon/pages/PokemonGame.vue";
import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
import { GameStatus } from "@/modules/pokemon/interfaces";
import PokemonPicture from "@/modules/pokemon/components/PokemonPicture.vue";
import PokemonOptions from "@/modules/pokemon/components/PokemonOptions.vue";
import PokemonScore from "@/modules/pokemon/components/PokemonScore.vue";


vi.mock('@/modules/pokemon/composables/usePokemonGame', () => ({
    usePokemonGame: vi.fn()
}));

describe('<PokemonGame />', () => {
    test('test initialize page', () => {
        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Playing,
            isLoading: true,
            pokemonOptions: [ ],
            randomPokemon: {
                id: 1,
                name: 'Bulbasaur',
            },
            wonGames: 0,
            lostGames: 0,
            getNextRound: vi.fn(),
            checkAnswer: vi.fn(),
            resetTheGame: vi.fn(),
        })

        const wrapper = mount(PokemonGame, {});
        // console.log(wrapper.html());
        expect(wrapper.find('section').attributes('class')).toBe('flex flex-col justify-center items-center w-screen h-screen');
        expect(wrapper.find('h1').attributes('class')).toBe('text-3xl');
        expect(wrapper.find('h3').attributes('class')).toBe('animate-pulse');
        expect(wrapper.find('h1').text()).toBe('Espere por favor');
        expect(wrapper.find('h3').text()).toBe('Cargando Pokémons');
    })

    test('test component page with mock data', () => {
        (usePokemonGame as Mock).mockReturnValue({
            gameStatus: GameStatus.Playing,
            isLoading: false,
            pokemonOptions: [
                {
                    id: 1,
                    name: 'Bulbasaur',
                },
                {
                    id: 2,
                    name: 'Ivysaur',
                },
            ],
            randomPokemon: {
                id: 1,
                name: 'Bulbasaur',
            },
            wonGames: 0,
            lostGames: 0,
            getNextRound: vi.fn(),
            checkAnswer: vi.fn(),
            resetTheGame: vi.fn(),
        })

        const wrapper = mount(PokemonGame, {});
        // console.log(wrapper.html());

        expect(wrapper.find('h1').text()).toBe('¿Quién es este Pokémon?')
        expect(wrapper.find('h1').attributes('class')).toBe('m-5 text-3xl');

        expect(wrapper.findComponent(PokemonPicture)).toBeTruthy();
        expect(wrapper.findComponent(PokemonOptions)).toBeTruthy();
        expect(wrapper.findComponent(PokemonScore)).toBeTruthy();

        // expect(wrapper.find('section img').attributes('class')).toBe('brightness-0 h-[200px]');
        // expect(wrapper.find('section img').attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg');
    })
})
