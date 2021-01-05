import React from 'react';
import Node from './Node';
import Operation from './Operations/Operations';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Operations from './Operations/Operations';

configure({adapter: new Adapter()});

let wrapper;
beforeEach(() => wrapper = shallow(<Node />))

describe('<Node/>', () => {

    it('should render 0 Nodes (don\'t have children and collapse is true)', () => {
        wrapper.setState({collapse: true});
        wrapper.setProps({
            name: 'a',
            id: 'tree/0',
            children: []
        });
        expect(wrapper.find(Node)).toHaveLength(0);
    })

    it('should render 0 Nodes (have n children but collapse is true)', () => {
        const n = 100;
        let i = 0;
        let children = [];
        while (i < n) {
            children.push({
                id: 'tree/0/' + i,
                name: i,
                children: [],
                counter: 0
            })
            i++;
        }
        wrapper.setState({collapse: true});
        wrapper.setProps({
            name: 'a',
            id: 'tree/0',
            children: children
        });
        expect(wrapper.find(Node)).toHaveLength(0);
    })

    it('should render n Nodes (have n children and collapse is false)', () => {
        const n = 10000;
        let i = 0;
        let children = [];
        while (i < n) {
            children.push({
                id: 'tree/0/' + i,
                name: i,
                children: [],
                counter: 0
            })
            i++;
        }
        wrapper.setState({collapse: false});
        wrapper.setProps({
            name: 'a',
            id: 'tree/0',
            children: children
        });
        expect(wrapper.find(Node)).toHaveLength(n);
    })


    it('should render 0 Nodes (collapse is false but don\'t have children)', () => {
        wrapper.setState({collapse: false});
        wrapper.setProps({
            name: 'a',
            id: 'tree/0',
            children: []
        });
        expect(wrapper.find(Node)).toHaveLength(0);
    })


    it('should render 1 Operations (collapse is true)', () => {
        wrapper.setState({collapse: true});
        wrapper.setProps({
            name: 'a',
            id: 'tree/0',
            children: []
        });
        expect(wrapper.find(Operations)).toHaveLength(1);
    })

    it('should render 1 Operations (collapse is false but don\'t have children)', () => {
        wrapper.setState({collapse: false});
        wrapper.setProps({
            name: 'a',
            id: 'tree/0',
            children: []
        });
        expect(wrapper.find(Operations)).toHaveLength(1);
    })

    it('should render 1 Operations (collapse is false and have n children)', () => {
        const n = 100;
        let i = 0;
        let children = [];
        while (i < n) {
            children.push({
                id: 'tree/0/' + i,
                name: i,
                children: [],
                counter: 0
            })
            i++;
        }
        wrapper.setState({collapse: false});
        wrapper.setProps({
            name: 'a',
            id: 'tree/0',
            children: children
        });
        expect(wrapper.find(Operations)).toHaveLength(1);
    })
}
);