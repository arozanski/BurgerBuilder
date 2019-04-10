import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SideDrawer from './SideDrawer';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

configure({ adapter: new Adapter() });

describe('<SideDrawer />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SideDrawer />);
    });

    it('should render <Backdrop /> component', () => {     
        expect(wrapper.contains(<Backdrop />)).toEqual(true);
    });

    it('should render <Logo /> component', () => {     
        expect(wrapper.contains(<Logo />)).toEqual(true);
    });

    it('should render <NavigationItems /> component', () => {     
        expect(wrapper.contains(<NavigationItems />)).toEqual(true);
    });
});