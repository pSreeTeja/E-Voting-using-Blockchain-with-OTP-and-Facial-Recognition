import React, { Component } from 'react';
import "../css/facialRecog.css"
class FacialRecogition extends Component{
    state={
        videoRef:React.createRef(),
        file:null,
    }
    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            this.state.videoRef.current.srcObject = stream;
            this.state.videoRef.current.play();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('file', this.state.file);
        await fetch('/upload', {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    };
    handleFileChange = (event) => {
        this.setState({file:event.target.files[0]});
    };
    render(){
        return(
            <div className='facialRecogMainDiv'>
                <div className='navbar'><span className='navbarTxt'>Facial Recognition</span></div>
                {/* <div className='bottomFacialRecogDiv'>
                    <video width="720" height="560" ref={this.state.videoRef}></video>
                    <button className='submitBtn'>Capture and Proceed</button>
                </div> */}
                <form onSubmit={this.handleSubmit}>
                    <input type="file" onChange={this.handleFileChange} />
                    <button type="submit">Upload</button>
                </form>

            </div>
        )
    }
}

export default FacialRecogition;