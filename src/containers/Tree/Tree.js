import React, {Component} from 'react';
import Node from './Node/Node';
import style from './Tree.module.css';

let counter = 0;

class Tree extends Component {

    state = {
        id: 'tree',
        children: [],
        // collapse: true,
        lastChildName: '',
        size: 0
    }

    addChild = (name) => {
        const child = {
            id: this.state.id + '/' + counter++,
            name: name,
            children: [],
            collapse: false,
            operations: false
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

    deleteNode = (id) => {
        let updateChildren = JSON.parse(JSON.stringify(this.state.children));
        this.findAndUpdateChildren(updateChildren, [], id);
        this.setState({children: updateChildren})
        //TODO: delete in firebase and in parent
    }

    filterChildren = () => this.state.children.filter(node => node.name.length > 0);


    rename = (name, id) => {
        let nodes = JSON.parse(JSON.stringify(this.state.children));
        this.findAndUpdateChildren(nodes, name, id);
        this.setState({children: nodes});

    }
    keyHandler = (event) => {
        if (event.key === 'Enter' && this.state.lastChildName.length > 0) {
            this.addChild(this.state.lastChildName);
        }
    }
    render() {

        let node = this.state.children.length ?
            <ul>
                {this.state.children.map(node => {
                    return (
                        <li key={node.id}>
                            {/* { console.log(node)} */}
                            <Node
                                name={node.name}
                                id={node.id}
                                children={node.children}
                                showOperations={node.showOperations}
                                delete={this.deleteNode}
                                rename={this.rename}
                                addChild={this.addChild}
                                addChildren={this.addChildren}
                                showOperationsHandler={this.showOperationsHandler}
                            />
                        </li>)
                })}
            </ul> :
            null;
        return (
            <div className={style.Tree}>
                <label>add node</label>
                <input
                    type="text"
                    value={this.state.lastChildName}
                    onChange={(event) => this.setState({lastChildName: event.target.value})}
                    onKeyPress={(event) => this.keyHandler(event)}>

                </input>
                <input
                    type="button"
                    value="add"
                    onClick={() => {
                        this.addChild(this.state.lastChildName);
                        this.setState({lastChildName: ''});
                    }
                    } disabled={!this.state.lastChildName.length > 0}></input>

                <div>{node}</div>

            </div>

        );
    }
}

export default Tree;