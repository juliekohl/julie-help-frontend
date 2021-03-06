import {mount} from "@vue/test-utils";
import ButtonUnit from "@/components/atoms/ButtonUnit/ButtonUnit.vue";
import {mountOptionsGlobal as global} from "../../../../tests/helpers";

describe('ButtonUnit', () => {
    it('is an HTML tag button given a nullable prop to', () => {
        const wrapper = mount(ButtonUnit, { global });
        const buttonUnit = wrapper.find('button.button-unit');

        expect(buttonUnit.exists()).toBe(true);
    });

    it('is an HTML tag a given a non nullable prop to', () => {
       const wrapper = mount(ButtonUnit, {
           props: {
               to: {
                   name: 'Test'
               },
           },
           global
       });
       const anchor = wrapper.find('a.button-unit');

       expect(anchor.exists()).toBe(true);
    });
})
