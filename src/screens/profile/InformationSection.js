import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button'
import Tab from '@material-ui/core/Tab';
import './InformationSection.css';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    gridListMedia:{
        flexWrap:"nowrap",
        transform:'translateZ(0)',
        width:'100%'
    }
};

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

const TabContainer = function(props){
    return(
        <Typography component="div" style={{ padding: 0}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}
class InformationSection extends Component {

    constructor() {
        super();
        this.state = {
            username:undefined,
            profile_picture:undefined,
            full_name:undefined,
            media:undefined,
            follows:undefined,
            followed_by:undefined,
            editModalOpen:false,
            editedFullName:"",
            FullNameRequired: "dispNone"

        }
    }
    getProfileData = async () => {

        const ACCESS_TOKEN = "8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65";

        const api_call = await fetch(
            `https://api.instagram.com/v1/users/self/?access_token=${ACCESS_TOKEN}`
        );
        const profileData = await api_call.json();
        if (profileData) {

            this.setState({
                username: profileData.data.username,
                profile_picture: profileData.data.profile_picture,
                full_name: profileData.data.full_name,
                media: profileData.data.counts.media,
                follows: profileData.data.counts.follows,
                followed_by: profileData.data.counts.followed_by

            });

        }

    }
    componentWillMount() {
        this.getProfileData();
    }

    EditModalHandler=()=>{
        this.setState({editModalOpen:true});
    }
    closeEditModal=()=>{
        this.setState({editModalOpen:false});
    }
    fullNameChangeHandler=(e)=>{
        this.setState({editedFullName:e.target.value});
    }
    editFullNameHandler=()=>{
        let editedName = this.state.editedFullName;
        editedName === "" ? this.setState({FullNameRequired: "dispBlock"}) : this.setState({
            FullNameRequired: "dispNone",
            full_name: editedName,
            editedFullName: "",
            editModalOpen: false,
        });
    }
    render() {
        return (
            <div className="details">

                <div className="containerDetails">
                    <div className="leftDetails">
                        <img className="profileImage" src={this.state.profile_picture} alt={this.state.username}/>
                    </div>
                    <div className="rightDetails">
                        <div>
                            <br />
                            <Typography variant="h5" component="h5" className="heading"> {this.state.username} </Typography>
                        </div>
                        <br />
                        <div className="counterContainer">
                            <div><Typography><span className="bold">Posts: </span> {this.state.media} </Typography></div>
                            <div><Typography><span className="bold">&nbsp;&nbsp;&nbsp;&nbsp;Followed:</span> {this.state.follows} </Typography></div>
                            <div><Typography><span className="bold"> &nbsp;&nbsp;&nbsp;&nbsp;Followed By:</span> {this.state.followed_by} </Typography></div>
                        </div>
                        <br/>
                        <div className="editName">
                            <div className="fullName">
                                <Typography variant="subheading">{this.state.full_name}</Typography>
                            </div>
                            <div className="editButton">
                                <Fab color="secondary" aria-label="Edit" onClick={this.EditModalHandler}><EditIcon/></Fab>
                            </div>
                        </div>
                    </div>

                </div>

                <Modal ariaHideApp={false} isOpen={this.state.editModalOpen} label="Edit"
                       onRequestClose={this.closeEditModal} style={customStyles}>

                    <Tab label="Edit" style={{fontStyle:"bold",fontSize:"1em",color:"#000000"}} className="editLabelHead">Edit</Tab>
                    <TabContainer>
                        <FormControl required>
                            <InputLabel htmlFor="fullName">Full Name</InputLabel>
                            <Input id="fullName" type="text" editedFullName ={this.state.editedFullName} onChange={this.editedFullNameChangeHandler}/>
                            <FormHelperText className={this.state.editedFullNameRequired}>
                                <span className="red">required</span>
                            </FormHelperText>
                        </FormControl><br/>
                        <Button variant="contained" style={{backgroundColor: '#5B00BB',color:"#FFFFFF",marginTop:'10px'}} onClick={this.editFullNameHandler}>UPDATE</Button>
                    </TabContainer>

                </Modal>

            </div>
        );

    }

}
export default withStyles(styles)(InformationSection);