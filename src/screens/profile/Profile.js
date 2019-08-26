import React, { Component } from 'react';
import Header from '../../common/header/Header';
import InformationSection from './InformationSection'
import ImageGrid from './ImageGrid'

class Profile extends Component {
    render() {
        return (
            <div>
                <Header screen={"Profile"}/>
                <InformationSection/>
                <ImageGrid/>
            </div>
        )
    }
}
export default Profile;