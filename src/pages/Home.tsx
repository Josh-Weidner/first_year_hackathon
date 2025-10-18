import launchPad from '../assets/image.png'
import { useNavigate } from "react-router-dom";

import './Home.css'

const Home: React.FC = () => {
  const navigate = useNavigate();

  return(
    <>
      <div>
        <a>
          <img src={launchPad} className="logoMain" />
        </a>
      </div>
      <div className="cardMain">
        <button onClick={() => {navigate("/Features")}}>
          Launch!
        </button>
      </div>
      <div className="cardMain">
        <button onClick={() => {navigate("/Results")}}>
          Test!
        </button>
      </div>
    </>
  );
};

export default Home;
