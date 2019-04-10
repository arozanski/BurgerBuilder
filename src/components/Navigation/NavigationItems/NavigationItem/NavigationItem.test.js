import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItem from './NavigationItem';
import {NavLink} from 'react-router-dom';

configure({ adapter: new Adapter() });

describe('<NavigationItem />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItem link="/"/>);
    });

    it('should render single <NavLink /> element', () => {     
        expect(wrapper.find(NavLink)).toHaveLength(1);
        expect(wrapper.find(NavLink).prop('to')).toEqual('/');
    });
});