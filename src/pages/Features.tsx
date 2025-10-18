import launchPadLogo from '../assets/launchPad Logo.png'
import majors from '../assets/betterMajor.png'
import student from '../assets/student.png'
import classImg from '../assets/class.png'
import { useNavigate } from "react-router-dom";

import './Features.css'

const Features: React.FC = () => {
  const navigate = useNavigate();

  return(
    <>
      <div>
        <a>
          <img src={launchPadLogo} className="logo" />
        </a>
      </div>
      <div className="cardFeatures">
        <a>
            <img src={majors} className='majors' />
        </a>
        <div>
            <h1>Discover Your Major</h1>
            <p>Not sure what to study? Take our quick survey and discover which majors align best with your interests, strengths, and goals. Our intelligent recommender analyzes your responses to help you make a confident, informed decision about your academic path.</p>
        <button onClick={() => {navigate("/Questions")}} className='findMajor'>
          Discover!
        </button>
        </div>
      </div>
      <div className="cardFeatures">
        <div>
            <h1>Meet Your Study Group</h1>
            <p>Connect with the right peers to study smarter—not harder. By matching you with groups that share your classes, learning style, and goals, you will join study sessions that actually work for you.</p>
        <button onClick={() => {navigate("/Questions")}} className='findMajor'>
          Meet!
        </button>
        </div>
        <a>
            <img src={student} className='majors' />
        </a>
      </div>
      <div className="cardFeatures">
        <a>
            <img src={classImg} className='majors' />
        </a>
        <div>
            <h1>Find Classes You Like</h1>
            <p>Find the classes that match YOUR interests, goals, and learning style. By analyzing what you enjoy and how you learn best, it recommends courses that align with your passions—making every semester more engaging, purposeful, and rewarding.</p>
        <button onClick={() => {navigate("/Questions")}} className='findMajor'>
          Find!
        </button>
        </div>
      </div>
    </>
  );
};

export default Features;