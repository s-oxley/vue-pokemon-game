import { describe, test, expect } from "vitest";
import { mount } from '@vue/test-utils';
import App from '../src/App.vue';
import PokemonGame from '@pokemon/pages/PokemonGame.vue';


describe('<App />', () => {
    test('Render App', () => {
        const wrapper = mount(App, {});
        expect(wrapper.findAllComponents(PokemonGame)).toBeDefined()
    })
})