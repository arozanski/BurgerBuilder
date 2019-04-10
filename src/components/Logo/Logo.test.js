import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Logo from './Logo';

configure({ adapter: new Adapter() });

describe('<Logo />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Logo />);
    });

    it('should render single image', () => {     
        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.find('img').props().alt).toEqual('Burger Builder');
        expect(wrapper.find('img').props().src).toEqual('burger-logo.png');
    });
});