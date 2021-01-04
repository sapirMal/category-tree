import React, {Component} from 'react';
import style from './Operations.module.css';

class Operations extends Component {

    state = {
        name: '',
        rename: '',
        showRename: false,
        showAdd: false

    }

    rename = () => {
        this.props.rename(this.state.rename, this.props.id);
        this.setState({showRename: false, rename: ''});
    }

    add = () => {
        this.props.addChild(this.state.name);
        this.setState({showAdd: false, name: ''});
    }

    iconAdd = () => {
        this.setState((prevState) => {return {showAdd: !prevState.showAdd}});
    }

    iconRename = () => {
        this.setState((prevState) => {return {showRename: !prevState.showRename}});
    }

    renameKeyHandler = (event) => {
        if (event.key === 'Enter' && this.state.rename.length > 0) {
            this.rename();
        }
    }

    addKeyHandler = (event) => {
        if (event.key === 'Enter' && this.state.name.length > 0) {
            this.add();
        }
    }

    render() {
        const inputRename = <div className={style.Operation}>
            <input
                type="text"
                placeholder='Enter a new name'
                autoFocus
                value={this.state.rename}
                onChange={(event) => this.setState({rename: event.target.value})}
                onKeyPress={(event) => this.renameKeyHandler(event)}>
            </input>
            <input
                type="button"
                value="RENAME"
                onClick={this.rename}
                disabled={!this.state.rename.length > 0}>
            </input>
        </div>;

        const inputAdd = <div className={style.Operation}>
            <input
                type="text"
                placeholder='Create a new node'
                autoFocus
                value={this.state.name}
                onChange={(event) => this.setState({name: event.target.value})}
                onKeyPress={(event) => this.addKeyHandler(event)}></input>
            <input
                type="button"
                value="ADD"
                onClick={this.add}
                disabled={!this.state.name.length > 0}></input>
        </div>;

        const icons = (<div className={style.Icons}>
            <div className={style.Icon}
                onClick={this.props.delete}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 512 512"
                    enableBackground="new 0 0 512 512;"
                    xmlSpace="preserve">
                    <g>
                        <g>
                            <g>
                                <polygon points="353.574,176.526 313.496,175.056 304.807,412.34 344.885,413.804    " />
                                <rect x="235.948" y="175.791" width="40.104" height="237.285" />
                                <polygon points="207.186,412.334 198.497,175.049 158.419,176.52 167.109,413.804    " />
                                <path d="M17.379,76.867v40.104h41.789L92.32,493.706C93.229,504.059,101.899,512,112.292,512h286.74     c10.394,0,19.07-7.947,19.972-18.301l33.153-376.728h42.464V76.867H17.379z M380.665,471.896H130.654L99.426,116.971h312.474     L380.665,471.896z" />
                            </g>
                        </g>
                    </g>
                    <g>
                        <g>
                            <path d="M321.504,0H190.496c-18.428,0-33.42,14.992-33.42,33.42v63.499h40.104V40.104h117.64v56.815h40.104V33.42    C354.924,14.992,339.932,0,321.504,0z" />
                        </g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                    <g>
                    </g>
                </svg>
            </div>
            <div className={style.Icon}
                onClick={this.iconRename}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    enableBackground="new 0 0 512 512;"
                    xmlSpace="preserve">
                    <g>     <g>
                        <path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2    c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067    S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2    c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z" />
                    </g>
                    </g>
                    <g>     <g>
                        <path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937    c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585    c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13    l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z" />
                    </g></g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g><g> </g>
                </svg>
            </div>
            <div className={style.Icon}
                onClick={this.iconAdd}>
                <svg xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                    enableBackground="new 0 0 512 512;"
                    xmlSpace="preserve">
                    <g><g>
                        <path d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257s255-116.39,255-257S397.61,0,257,0z M392,285H287v107    c0,16.54-13.47,30-30,30c-16.54,0-30-13.46-30-30V285H120c-16.54,0-30-13.46-30-30c0-16.54,13.46-30,30-30h107V120    c0-16.54,13.46-30,30-30c16.53,0,30,13.46,30,30v105h105c16.53,0,30,13.46,30,30S408.53,285,392,285z" />
                    </g>
                    </g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
                </svg>
            </div>
        </div >);

        return (
            <div className={style.Operations}>
                {icons}
                {this.state.showRename ? inputRename : null}
                {this.state.showAdd ? inputAdd : null}
            </div>

        )
    }
}

export default Operations;