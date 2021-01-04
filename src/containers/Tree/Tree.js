import React, {Component} from 'react';
import axios from 'axios';
import Node from './Node/Node';
import style from './Tree.module.css';


let counter = 0;

class Tree extends Component {

    state = {
        id: 'tree',
        children: [],
        lastChildName: '',
        size: 0
    }


    componentDidMount() {
        const urlGetTree = 'https://my-category-tree-default-rtdb.europe-west1.firebasedatabase.app/tree/children.json';
        axios.get(urlGetTree)
            .then(res => {
                console.log(res);
                if (res.data) {
                    this.setState({children: res.data})
                }
            })
            .catch(err => console.log(err));
        const urlGetCounter = 'https://my-category-tree-default-rtdb.europe-west1.firebasedatabase.app/tree/counter.json';

        axios.get(urlGetCounter)
            .then(res => {
                console.log(res);
                if (res.data) {
                    counter = res.data;
                }
            })
            .catch(err => console.log(err));
    }



    addChild = (name) => {
        const child = {
            id: this.state.id + '/' + this.state.size,
            name: name,
            children: [],
            collapse: false,
            operations: false,
            counter: 0
        }
        this.setState((prevState) => {return {size: prevState.size + 1}});
        const updateChildren = this.state.children.concat(child);
        this.setState({children: updateChildren});
    }

    addChildren = (newChildren, id) => {
        let updateChildren = JSON.parse(JSON.stringify(this.state.children));
        this.findAndUpdateChildren(updateChildren, newChildren, id);
        this.setState({children: updateChildren})
    }

    findAndUpdateChildren = (nodes, newChildren, nodeId) => {
        for (let i = 0; i < nodes.length; i++) {
            // console.log(nodes[i]);             // console.log('id: ' + nodeId );
            if (nodeId.search(nodes[i].id) !== -1) {
                if (nodes[i].id === nodeId) {
                    //rename
                    if (typeof newChildren === 'string') {
                        nodes[i].name = newChildren;
                    }
                    // add child
                    else if (newChildren.length > 0) {
                        nodes[i].children = newChildren;
                        nodes[i].counter++;
                        this.setState((prevState) => {return {size: prevState.size + 1}});
                    }
                    // delete child
                    else {
                        nodes.splice(i, 1);
                        this.setState((prevState) => {return {size: prevState.size - 1}});

                    }
                    return;
                }
                this.findAndUpdateChildren(nodes[i].children, newChildren, nodeId);
            }
        }
    }

    add = () => {
        this.addChild(this.state.lastChildName);
        this.setState({lastChildName: ''});
    }

    keyHandler = (event) => {
        if (event.key === 'Enter' && this.state.lastChildName.length > 0) {
            this.add();
        }
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

        const urlSaveCounter = 'https://my-category-tree-default-rtdb.europe-west1.firebasedatabase.app/tree/counter.json';
        // const counter = JSON.stringify(counter);
        axios.put(urlSaveCounter, counter)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    render() {

        let node = this.state.children.length ?
            <ul>
                {this.state.children.map(node => {
                    return (
                        <li key={node.id}>
                            <Node
                                name={node.name}
                                id={node.id}
                                children={node.children}
                                counter={node.counter}
                                // showOperations={node.showOperations}
                                delete={this.deleteNode}
                                rename={this.rename}
                                addChildren={this.addChildren}
                            // showOperationsHandler={this.showOperationsHandler}
                            />
                        </li>)
                })}
            </ul> :
            null;
        return (
            <div className={style.Tree}>
                <div className={style.Center}>
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
                </div>
                <div>{node}</div>

            </div>

        );
    }
}

export default Tree;