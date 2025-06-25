import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils';
import PokemonOptions from "@/modules/pokemon/components/PokemonOptions.vue";
import type { Pokemon } from "@/modules/pokemon/interfaces";


const options: Pokemon[] = [
    {
        id: 1,
        name: 'Bulbasaur'
    },
    {
        id: 20,
        name: 'Raticate'
    },
    {
        id: 14,
        name: 'Kakuna'
    },
    {
        id: 4,
        name: 'Charmander'
    }
];

describe('<PokemonOptions />', () => {
    test('Render component PokemonOptions', () => {
        const correctAnswer: number = 20;
        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                blockSelection: true,
                correctAnswer
            },
        });
        const buttons = wrapper.findAll('button');
        expect(buttons.length).toBe(options.length);

        buttons.forEach((button, index) => {
            // check class correct in button
            if (options[index].id === correctAnswer) {
                expect(button.attributes('class')).toBe('capitalize disabled:shadow-none disabled:bg-gray-100 correct');
            } else {
                expect(button.attributes('class')).toBe('capitalize disabled:shadow-none disabled:bg-gray-100 incorrect');
            }
            expect(button.text()).toBe(options[index].name)
        });
    })

    test('Test emit event selectOption when a button is clicked', async () => {
        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                blockSelection: false,
                correctAnswer: 1
            },
        });

        const [ button1, button2, button3, button4 ] = wrapper.findAll('button');
        await button1.trigger('click');
        await button2.trigger('click');
        await button3.trigger('click');
        await button4.trigger('click');

        expect(wrapper.emitted().selectedOption.length).toBe(4);
        expect(wrapper.emitted().selectedOption[2]).toEqual([14]);
    });

    test('Test block selection buttons', async () => {
        const wrapper = mount(PokemonOptions, {
            props: {
                options,
                blockSelection: true,
                correctAnswer: 14
            },
        });
        const buttons = wrapper.findAll('button');
        await buttons[1].trigger('click')
        // check event selectedOption not emmitted
        expect(wrapper.emitted().selectedOption).toBeFalsy();

        buttons.forEach((button, index) => {
            const attributes = Object.keys(button.attributes());
            // check property disabled present in button
            expect(attributes).toContain('disabled');
        });
    })
})
