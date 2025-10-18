import launchPadLogo from '../assets/launchPad Logo.png'
import majors from '../assets/Pick-a-major-scaled.png'
import { useNavigate } from "react-router-dom";

import './Features.css'

const Questions: React.FC = () => {
  const navigate = useNavigate();

  return(
    <>
      <div>
        <a>
          <img src={launchPadLogo} className="logo" />
        </a>
      </div>
      <div className="card">
        <a>
            <img src={majors} className='majors' />
        </a>
        <div>
            <h2>Discover Your Major</h2>
            <p>Not sure what to study? Take our quick survey and discover which majors align best with your interests, strengths, and goals. Our intelligent recommender analyzes your responses to help you make a confident, informed decision about your academic path.</p>
        <button onClick={() => {navigate("/Feature")}} className='findMajor'>
          Find My Major!
        </button>
        </div>
      </div>
    </>
  );
};

export default Questions;