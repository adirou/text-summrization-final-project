import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'
import axios from 'axios';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

export class UploadImage extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: [],
      imageName: '',
      uploading: false,
    };
  }

    handleAddImage = async () => {
        this.setState({uploading: true});
        const formData = new FormData();
        formData.append('imageBuffer', this.state.files[0]);
        formData.append('imageName', this.state.imageName);

        const res = await axios.post('/api/images',formData,{ 
            headers:{
                "Content-Type": "multipart/form-data"
            },
        });
        //error handling


        this.props.onImageUploaded && this.props.onImageUploaded(this.state.imageName);
    }

  handleChangeFile = (files) => {
    this.setState({
      files: files
    });
  }
  handleChangeName = (event) => {
    this.setState({
      imageName: event.target.value
    });
  }

  render(){
    return (
        <div style={{width: '100%',margin:'20px 0 40px'}}>
          {this.state.uploading ? 
            <CircularProgress />
          :
          <div>
            <TextField 
                value={this.state.imageName}
                style={{width: '200px', marginBottom: '20px'}}
                onChange={this.handleChangeName}
                id="standard-basic"
                label="Image Name" />
                
            <DropzoneArea 
                filesLimit={1}
                onChange={this.handleChangeFile}/>
            <Button 
                style={{display: 'block', marginTop: '15px', float: 'right'}}
                disabled={this.state.files.length === 0 || !this.state.imageName}
                variant="contained"
                color="primary"
                onClick={this.handleAddImage}>
                    Upload
            </Button>
          </div>}
        </div> 
    )  
  }
} 
