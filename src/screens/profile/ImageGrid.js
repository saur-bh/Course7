import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import PostdetailSection from './PostdetailSection'
import Modal from 'react-modal';

//add the access token below
const ACCESS_TOKEN = "8661035776.d0fcd39.87fd934e04f84253aaf234d8bd4e4c65";


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1000,
        height: 900,
    },
});
class ImageGrid extends Component{

    constructor(props){
        super(props);
        this.state={
            imageData:[],
            modalIsOpen:false,
            currentPost:{}
        }
    }


    componentWillMount(){
        this.getData();
    }
    getData = async () => {
        const api_call= await fetch(
            'https://api.instagram.com/v1/users/self/media/recent?access_token='+ACCESS_TOKEN
        );
        const mediaData = await api_call.json();
        if(mediaData){
            this.setState({imageData:mediaData.data});
            console.log(mediaData.data[0].images.standard_resolution.url);
        }
    }
    openModalHandler=(post)=>{
        this.setState({modalIsOpen:true,currentPost:post});
        console.log(post)
    }
    closeModalHandler=()=>{
        this.setState({modalIsOpen:false});
    }

    render(){
        let {classes}= this.props;
        let imageData= this.state.imageData;
        return(
            <div className={classes.root}>
                <GridList cellHeight={400} className={classes.gridList} cols={3}>
                    {imageData.map(post => (
                        <GridListTile key={"grid"+post.id} onClick={() => this.openModalHandler(post)}>
                            <img src={post.images.standard_resolution.url} alt={post.caption.text} />
                        </GridListTile>
                    ))}
                </GridList>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen}
                       onRequestClose={this.closeModalHandler}  >

                    <PostdetailSection currentPostData={this.state.currentPost}/>


                </Modal>
            </div>

        );

    }

}
export default withStyles(styles)(ImageGrid);