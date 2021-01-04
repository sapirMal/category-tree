import React, {Component} from 'react';
import axios from 'axios';
import Node from './Node/Node';
import style from './Tree.module.css';


class Tree extends Component {

    state = {
        id: 'tree',
        children: [],
        lastChildName: '',
        counter: 0
    }

    componentDidMount() {
        const urlTree = 'https://my-category-tree-default-rtdb.europe-west1.firebasedatabase.app/tree/children.json';
        axios.get(urlTree)
            .then(res => {
                // console.log('[then1] ');
                // console.log(res);
                if (res.data) {
                    this.setState({children: res.data})
                    const urlCounter = 'https://my-category-tree-default-rtdb.europe-west1.firebasedatabase.app/tree/counter.json';
                    return axios.get(urlCounter);
                }
                return;
            }).then(res => {
                // console.log('[then2] ');
                // console.log(res);
                if (res) {
                    this.setState({counter: res.data})
                }
            })
            .catch(err => console.log(err));
    }



    add = () => {
        const child = {
            id: this.state.id + '/' + this.state.counter,
            name: this.state.lastChildName,
            children: [],
            counter: 0
        }
        this.setState((prevState) => {return {counter: prevState.counter + 1}});
        const updateChildren = this.state.children.concat(child);
        this.setState({children: updateChildren, lastChildName: ''});
    }

    keyHandler = (event) => {
        if (event.key === 'Enter' && this.state.lastChildName.length > 0) {
            this.add();
        }
    }

    findAndUpdateChildren = (nodes, update, nodeId) => {
        for (let i = 0; i < nodes.length; i++) {
            if (nodeId.search(nodes[i].id) !== -1) {
                if (nodes[i].id === nodeId) {
                    // rename: update = child.name
                    if (typeof update === 'string') {
                        nodes[i].name = update;
                    }
                    // add child: update = [...children]
                    else if (update.length > 0) {
                        nodes[i].children = update;
                        nodes[i].counter++;
                    }
                    // delete child: update = []
                    else {
                        nodes.splice(i, 1);
                    }
                    return;
                }
                this.findAndUpdateChildren(nodes[i].children, update, nodeId);
            }
        }
    }

    addChildren = (newChildren, id) => {
        let updateChildren = JSON.parse(JSON.stringify(this.state.children));
        this.findAndUpdateChildren(updateChildren, newChildren, id);
        this.setState({children: updateChildren})
    }


    deleteNode = (id) => {
        let updateChildren = JSON.parse(JSON.stringify(this.state.children));
        this.findAndUpdateChildren(updateChildren, [], id);
        this.setState({children: updateChildren})
    }

    rename = (name, id) => {
        let nodes = JSON.parse(JSON.stringify(this.state.children));
        this.findAndUpdateChildren(nodes, name, id);
        this.setState({children: nodes});
    }

    save = () => {
        const url = 'https://my-category-tree-default-rtdb.europe-west1.firebasedatabase.app/tree/children.json';
        const tree = JSON.stringify(this.state.children);
        axios.put(url, tree)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        const urlCounter = 'https://my-category-tree-default-rtdb.europe-west1.firebasedatabase.app/tree/counter.json';
        axios.put(urlCounter, this.state.counter)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    render() {
        const nodes = !this.state.children.length ? null :
            <div>
                <ul>
                    {this.state.children.map(node => {
                        return (<li key={node.id}>
                            <Node
                                name={node.name}
                                id={node.id}
                                children={node.children}
                                counter={node.counter}
                                delete={this.deleteNode}
                                rename={this.rename}
                                addChildren={this.addChildren} />
                        </li>)
                    })}
                </ul>
            </div>;

        const panelControl = <div className={style.Center}>
            <div>
                <button className={style.Button}
                    onClick={this.save}>
                    SAVE<br />TREE </button>
            </div>
            <input className={style.Input}
                type="text"
                placeholder='Create a top-level node'
                value={this.state.lastChildName}
                onChange={(event) => this.setState({lastChildName: event.target.value})}
                onKeyPress={(event) => this.keyHandler(event)}>
            </input>
            <input className={style.Input}
                type="button"
                value="ADD"
                onClick={this.add}
                disabled={!this.state.lastChildName.length > 0}></input>
        </div>;

        return (
            <div className={style.Tree}>
                {panelControl}
                {nodes}
            </div>

        );
    }
}

export default Tree;