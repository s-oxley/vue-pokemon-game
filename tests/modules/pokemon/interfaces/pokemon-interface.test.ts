import type { Pokemon } from "@/modules/pokemon/interfaces";
import { describe, test, expect } from "vitest";

describe('Pokemon interface', () => {
    const pokemon: Pokemon = { id: 1, name: 'bolbing' }

    test('Should have an id property of type number', () => {
        expect(pokemon.id).toEqual(expect.any(Number))
    });
    test('Should have name property of type string', () => {
        expect(pokemon.name).toEqual(expect.any(String));
    });
})