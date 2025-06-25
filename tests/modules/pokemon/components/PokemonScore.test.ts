import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils';
import PokemonScore from "@/modules/pokemon/components/PokemonScore.vue";


describe('<PokemonScore />', () => {
    test('Test render component PokemonScore', () => {
        const wrapper = mount(PokemonScore, {
            props: {
                won: 5,
                lost: 10
            }
        });

        const divs = wrapper.findAll('div');
        expect(divs.length).toBe(2);
        expect(divs[0].text()).toBe('Aciertos: 5');
        expect(divs[1].text()).toBe('Fallos: 10');
    })

    test('Test button clicked and event emit', async () => {
        const wrapper = mount(PokemonScore, {
            props: {
                won: 1,
                lost: 2,
            }
        });
        const button = wrapper.find('button');
        button.trigger('click');
        
        expect(wrapper.emitted().resetGame).toBeTruthy();
    })
})