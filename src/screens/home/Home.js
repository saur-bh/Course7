import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import Login from '../login/Login';
import Card from './Card';
class Home extends Component {


    render() {
        return (
            <div>
                <Header/>
                <Card/>
            </div>
        )
    }
}
export default Home;