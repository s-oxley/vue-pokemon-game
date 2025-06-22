import { GameStatus } from "@/modules/pokemon/interfaces";
import { describe, test, expect } from "vitest";

describe('Game status enum.', () => {
    test('Should have a value of "playing"', () => {
        expect(GameStatus.Playing).toBe('playing');
    });
    test('Should have a value of "won"', () => {
        expect(GameStatus.Won).toBe('won');
    });
    test('Should have a value of "lost"', () => {
        expect(GameStatus.Lost).toBe('lost');
    });
})
