import React, { Component } from 'react';
import "../css/facialRecog.css"
import * as faceapi from "face-api.js"
import Webcam from "react-webcam";
import ReactLoading from "react-loading";
class FacialRecogition extends Component{
    state={
        videoRef:React.createRef(),
        userImg:null,
        imageRef:React.createRef(),
        errorMsg:"",
        isLoading:false,
    }
    async componentDidMount() {
        const voterID=window.localStorage.getItem("voterID")
        if(voterID==null){
            window.location.assign("/")
        }
        this.setState({isLoading:true})
          const loadModels=()=>{
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
                faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
            ]).then(()=>{
                console.log("ok")
                this.setState({isLoading:false})
            }).catch((e)=>console.log(e));
          }
        loadModels();

    }
  
    loadLabeledImages=()=>{
        console.log("loadLabeledImages")
        const labels=["Teja","MB","Suriya"]
        return Promise.all(
            labels.map(async label=>{
                const descriptions=[]
                for(let i=1;i<=2;i++){
                    const img=await faceapi.fetchImage(`https://raw.githubusercontent.com/pSreeTeja/Images/main/${label}/${i}.jpg`)
                    const detections=await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    console.log("got detections")
                    descriptions.push(detections.descriptor)
                }
                return new faceapi.LabeledFaceDescriptors(label,descriptions)
            })
        )
      }

    handleImage=async()=>{
        //Detection code
        this.setState({isLoading:true});
        const detections=await faceapi.detectAllFaces(this.state.imageRef.current,new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors().withFaceExpressions();
        console.log("Detections:"+detections.length)
        //Recognition code
        console.log("Recognition code starts")
        const LabeledFaceDescriptors=await this.loadLabeledImages()
        // console.log(LabeledFaceDescriptors)
        console.log("After Labeled Descriptors")
        const faceMatcher =new faceapi.FaceMatcher(LabeledFaceDescriptors,0.6)
        // console.log(faceMatcher)
        const results=detections.map(d=>faceMatcher.findBestMatch(d.descriptor))
        // console.log(results[0]._label)
        const name=JSON.parse(window.localStorage.getItem("name"));
        if(results.length==0 || results[0]._label!==name){
            this.setState({isLoading:false,errorMsg:"Failed to recognize your face. Re-try again or consult Admin"})
        }
        else{
            //vote blockchain code-----------------------------------------
            const id=JSON.parse(window.localStorage.getItem('candidateId'))
            console.log("candidateId="+id)
            this.props.handleVote(id,window.localStorage.getItem("voterID"))
            //----------------------------------------------------------------------
            // window.location.assign("/verify/votedone");
            window.localStorage.clear();
        }
    }

    videoConstraints = {
        width: { min: 480 },
        height: { min: 720 },
        facingMode: "user",
      };
    capture=()=>{
        const image=this.state.videoRef.current.getScreenshot();
        this.setState({userImg:image})
        this.handleImage()
    }
    render(){
        return(
            <div className='facialRecogMainDiv'>
 
                {this.state.isLoading && 
                <div className='loadingDiv'><ReactLoading className="loadingComponent" type={'spinningBubbles'} color={'black'} height={'100px'} width={'100px'} /></div>}
                
                <div className='navbar'><span className='navbarTxt'>Facial Recognition</span></div>
                <div className='bottomFacialRecogDiv'>
                    <Webcam 
                        height={480}
                        width={720}
                        mirrored={true}
                        ref={this.state.videoRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={this.videoConstraints}
                    />
                    <button className='submitBtn' onClick={this.capture}>Capture and Proceed</button>
                    <span className='errorMsg'>{this.state.errorMsg}</span>
                </div>
                <img ref={this.state.imageRef} src={this.state.userImg} style={{display:"none"}} />

            </div>
        )
    }
}

export default FacialRecogition;