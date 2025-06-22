import { describe, test, expect } from "vitest";
import { pokemonApi } from "@/modules/pokemon/api/pokemonApi";

describe('pokemonApi', () => {
    test('Should be configured as expected', () => {
        const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
        expect(pokemonApi.defaults.baseURL).toBe(baseUrl);
    })
})
