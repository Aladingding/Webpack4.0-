import React from 'react'
import Header from './Header'
import Main from './Main'
import { Link } from 'react-router-dom'
//const User = Loadable({loader: () => import('./User.jsx'),loading:Loading});
export default class App extends React.Component{
    constructor() {
        super();
        this._setState = this._setState.bind(this);
    }
    componentDidMount(){
    }
    _setState(state,fn){
    }
    render(){
        return <div>
            <Header />
            <Main />
        </div>
    }
};
