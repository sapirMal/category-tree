import React from 'react';
import Tree from './Tree';
import Node from './Node/Node';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let wrapper;
beforeEach(() => wrapper = shallow(<Tree />));

describe('<Tree/>', () => {

    it('should render empty tree', () => {
        wrapper.setState({
            id: 'tree',
            children: [],
            lastChildName: '',
            counter: 0
        });
        expect(wrapper.find(Node)).toHaveLength(0);
    })
    /*
        it('should render tree with n nodes', () => {
            const n = 500;
            let i = 0;
            let children = [];
            while (i < n) {
                children.push({
                    id: 'tree/' + i,
                    name: i,
                    children: [],
                    counter: 0
                })
                i++;
            }
            wrapper.setState({
                id: 'tree',
                children: children,
                lastChildName: '',
                counter: 0
            });
            expect(wrapper.find(Node)).toHaveLength(n);
        })
    
    
        it('should render tree with 1 node because all of the others are collapse', () => {
            let i = 0;
            let children = [{
                id: 'tree/0',
                name: 'first node',
                children: [],
                counter: 0
            }];
            while (i < 5) {
                children[0].children.push({
                    id: 'tree/0/' + i,
                    name: i,
                    children: [],
                    counter: 0
                })
                i++;
            }
            wrapper.setState({
                id: 'tree',
                children: children,
                lastChildName: '',
                counter: 0
            });
            expect(wrapper.find(Node)).toHaveLength(1);
        }) */
}
);