import React, {Component} from 'react';
import './PostdetailSection.css';
import Typography from '@material-ui/core/Typography';

class PostdetailSection extends Component{
    constructor(props){
        super(props);
        this.state={
            standard_resolution:"",
            profile_picture:"",
            username:"",
            caption:"",
            tags:[],
            comments:[],
            likes:""

        }
    }
    componentWillMount(){
        this.setState({
            standard_resolution:this.props.currentPostData.images.standard_resolution.url,
            profile_picture:this.props.currentPostData.user.profile_picture,
            username:this.props.currentPostData.user.username,
            caption:this.props.currentPostData.caption.text.split('\n')[0],
            tags:this.props.currentPostData.tags,
            likes:this.props.currentPostData.likes.count

        })
        console.log(this.state.standard_resolution);
    }
    render(){
        return(
            <div className="postDetailsContainer">
                <div className="left">
                    <img className="postedImage" src={this.state.standard_resolution} alt={this.state.username} />
                </div>
                <div className="right">
                    <div className="userData">
                        <div>
                            <img className="profileImageIcon" src={this.state.profile_picture} alt={this.state.username} />
                        </div>
                        <div>
                            <Typography variant="h5" component="h5">{this.state.username} </Typography>
                        </div>

                    </div>
                    <hr/>

                    <br />

                    <div>
                        <Typography variant="subheading">  {this.state.caption}</Typography>
                    </div>

                    <div>{this.state.tags.map((tag)=>(
                        <span className="hashTag">{"#"+tag+" "}</span>
                    ))}
                    </div>
                </div>
                <br/>

            </div>


        );
    }
}
export default PostdetailSection;