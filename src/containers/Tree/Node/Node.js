import React, {Component} from 'react';
import Operations from './Operations/Operations';
import style from './Node.module.css';

let counter = 0;

class Node extends Component {

    state = {
        showOperations: false,
        collapse: true,
    }

    showOperationsHandler = () => this.setState((prevState) => {return {showOperations: !prevState.showOperations}})

    addChild = (name) => {
        const child = {
            id: this.props.id + '/' + counter++,
            name: name,
            children: [],
            collapse: true,
            operations: false
        }
        const updateChildren = this.props.children.concat(child);
        this.props.addChildren(updateChildren, this.props.id);
    }

    deleteChildren = () => {
        this.props.delete(this.props.id);
    }

    toggle = () => this.setState((prevState) => {return {collapse: !prevState.collapse}});


    render() {

        const nodes =
            (this.props.children.length > 0) ?
                (!this.state.collapse) ?
                    <div >
                        <span
                            className={style.Open}
                            onClick={this.toggle}>
                        </span>
                        {this.props.name}
                        <ul>
                            {this.props.children.map(node => {
                                return (
                                    <li key={node.id}>

                                        <Node
                                            name={node.name}
                                            id={node.id}
                                            children={node.children}
                                            delete={this.props.delete}
                                            rename={this.props.rename}
                                            addChildren={this.props.addChildren}
                                        />

                                    </li>
                                )
                            }
                            )}
                        </ul>
                    </div>

                    :

                    <div  >
                        <span
                            className={style.Close}
                            onClick={this.toggle}>
                            {this.props.name}
                        </span>

                    </div>
                : <span className={style.NoChild}>{this.props.name}</span>;


        const operations =
            <Operations
                id={this.props.id}
                name={this.props.name}
                delete={this.deleteChildren}
                rename={this.props.rename}
                addChild={this.addChild}
            />;
        return (
            <div className={style.Node}>
                {operations}
                {nodes}

            </div>

        );
    }
}

export default Node;