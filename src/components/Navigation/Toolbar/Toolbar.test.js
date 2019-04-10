import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Toolbar from './Toolbar';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

configure({ adapter: new Adapter() });

describe('<Toolbar />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Toolbar />);
    });

    it('should render <DrawerToggle /> component', () => {     
        expect(wrapper.contains(<DrawerToggle />)).toEqual(true);
    });

    it('should render <Logo /> component', () => {     
        expect(wrapper.contains(<Logo />)).toEqual(true);
    });

    it('should render <NavigationItems /> component', () => {     
        expect(wrapper.contains(<NavigationItems />)).toEqual(true);
    });
});