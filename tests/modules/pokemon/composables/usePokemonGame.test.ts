import { describe, test, expect, vi } from "vitest";
//import { mount } from '@vue/test-utils';
import { withSetup } from '../../../utils/with-setup';
import { usePokemonGame } from "@/modules/pokemon/composables/usePokemonGame";
import { GameStatus, type Pokemon } from "@/modules/pokemon/interfaces";
import { flushPromises } from "@vue/test-utils";
import MockAdapter from 'axios-mock-adapter';
import { pokemonApi } from "@/modules/pokemon/api/pokemonApi";
import { pokemonsListFake } from '../../../data/pokemons-fake';
import confetti from 'canvas-confetti';


const mockPokemonAPI = new MockAdapter(pokemonApi);
mockPokemonAPI.onGet('/?limit=151').reply(200, pokemonsListFake );

vi.mock('canvas-confetti', () => ({
    default: vi.fn(),
}))

describe('usePokemonGame', () => {
    test('test initialize composable', async () => {
        const [ result, app ] = withSetup(usePokemonGame)
        // console.log(result);
        // console.log(app);
        expect(result.gameStatus.value).toBe(GameStatus.Playing);
        expect(result.isLoading.value).toBe(true);
        expect(result.lostGames.value).toEqual(0);
        expect(result.wonGames.value).toEqual(0);
        expect(result.pokemonOptions.value).toEqual([]);
        expect(result.randomPokemon.value).toBe(undefined);

        // await new Promise((resolve) => setTimeout(resolve, 2000));
        await flushPromises();

        expect(result.isLoading.value).toEqual(false);
        expect(result.pokemonOptions.value.length).toBe(5);
        expect(result.randomPokemon.value).toEqual({
            id: expect.any(Number),
            name: expect.any(String),
        });
    })

    test('Test function getNextRound', async () => {
        const [ result ] = withSetup(usePokemonGame);
        // wait for promises:
        await flushPromises();

        result.gameStatus.value = GameStatus.Won;
        result.getNextRound(5);

        // ckeck game status playing
        expect(result.gameStatus.value).toBe(GameStatus.Playing);
        // check count pokemons 
        expect(result.pokemonOptions.value).toHaveLength(5);

        
        const mapOne: number[] = result.pokemonOptions.value.map((p: Pokemon) => p.id)
        mapOne.sort((a: number, b: number) => (a - b));
        result.getNextRound(5);
        const mapTwo: number[] = result.pokemonOptions.value.map((p: Pokemon) => p.id)
        mapTwo.sort((a: number, b: number) => (a - b));
        // expect(JSON.stringify(mapOne) == JSON.stringify(mapTwo)).toBe(false)
        expect(mapOne).not.toEqual(mapTwo);
    })

    test('Test correctly handle a incorrect answer', async () => {
        const [ result ] = withSetup(usePokemonGame);
        // wait for promises:
        await flushPromises();
        const { checkAnswer, gameStatus } = result;

        expect(gameStatus.value).toBe(GameStatus.Playing);
        // pokemon not exist
        checkAnswer(99999);
        expect(gameStatus.value).toBe(GameStatus.Lost);
    })

    test('Test correctly handle a correct answer', async () => {
        const [ result ] = withSetup(usePokemonGame);
        await flushPromises();
        const { checkAnswer, gameStatus, randomPokemon } = result;

        expect(gameStatus.value).toBe(GameStatus.Playing);
        // pokemon not exist
        checkAnswer(randomPokemon.value.id);
        expect(confetti).toHaveBeenCalled();
        expect(confetti).toHaveBeenCalledWith({
            particleCount: 300,
            spread: 150,
            origin: { y: 0.6 },
        });

        expect(gameStatus.value).toBe(GameStatus.Won);
    })

    test('Test function resetTheGame', async () => {
        const [ result ] = withSetup(usePokemonGame);
        await flushPromises();
        const { resetTheGame, lostGames, wonGames } = result;

        resetTheGame();
        expect(result.lostGames.value).toEqual(0);
        expect(result.wonGames.value).toEqual(0);
    })
})
