import VotedImg from "../media/check.png";
import "../css/voteDone.css"
function VoteDone() {
    return ( <div className="voteDoneMainDiv">
        <img src={VotedImg} width={300} height={300} alt="votedImg"/>
        <h1 className="votedSuccessfullyTXT">VOTED SUCCESSFULLY</h1>
    </div> );
}

export default VoteDone;