import launchPadLogo from '../assets/launchPad Logo.png'
import {AnswerSet, MajorList, MajorInfo} from "../datatypes/types"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import Majors from "./Majors"
import { useNavigate } from "react-router-dom"

import './Results.css';

const prompt1 = `I want to learn more about these three majors in the order I give them.`

const prompt2 =`Give me only the following information as I specify the format. BE STRICT.

Give me the top 3 positions in the field of study after graduation with a bachelors and 3 with a masters as a list (e.g. Software Engineer, AI Engineer, Cyber Security)

What does college look like, I want only one sentence that includes the average length in years of the major for a bachelors and a masters, the difficulty compared to other majors with a score 0-10. 0 being the easiest, ten being the most difficult.

Give a single paragraph with no more than 3 sentences of the day in life of graduate in the field. What is the average pay range, what is the usual schedule, how is the work-life balance like. 

Finally, give me a list of 3 classes at Brigham Young University that would help me learn about the major, they must be introductory classes, they ussualy start with 1.

return the information as JSON objects with the follow fields: major: , top_positions: {bachelors: [], masters: []}, college_overview: , day_in_life: , byu_courses: []. 
`

const Results: React.FC = () => {
    const navigate = useNavigate()
    const {state} = useLocation();
    const [majors, setMajors] = useState<MajorList>();
    const answers: AnswerSet = state;
    const [majorInfo, setMajorInfo] = useState<MajorInfo[]>([
  {
    major: "Computer Science",
    top_positions: {
      bachelors: ["Software Engineer", "Web Developer", "Systems Analyst"],
      masters: ["AI Engineer", "Data Scientist", "Cybersecurity Specialist"],
    },
    college_overview:
      "A bachelor's typically takes 4 years and a master's 2 years, with a difficulty of 8/10 compared to other majors.",
    day_in_life:
      "Graduates often work on technical projects, collaborate with teams, and solve challenging problems. The average salary ranges from $80,000–$130,000, usually in full-time roles with moderate flexibility. Work-life balance varies but is generally manageable with proper time management.",
    byu_courses: [
      "CS 142: Introduction to Computer Programming",
      "CS 235: Data Structures",
      "CS 324: Systems Programming",
    ],
  },
  {
    major: "Mechanical Engineering",
    top_positions: {
      bachelors: ["Design Engineer", "Manufacturing Engineer", "Project Engineer"],
      masters: ["Aerospace Engineer", "Robotics Engineer", "Thermal Systems Specialist"],
    },
    college_overview:
      "A bachelor's takes around 4 years and a master's about 2, with a difficulty rating of 9/10 due to heavy math and physics requirements.",
    day_in_life:
      "Mechanical engineers design and test physical systems or components, often collaborating in industrial or research environments. They work roughly 40–50 hours weekly with some project deadlines causing overtime. Average pay ranges from $75,000–$120,000, with a decent work-life balance depending on the field.",
    byu_courses: [
      "ME EN 250: Modeling of Engineering Systems",
      "ME EN 330: Fluid Mechanics",
      "ME EN 335: Heat Transfer",
    ],
  },
  {
    major: "Psychology",
    top_positions: {
      bachelors: ["Human Resources Specialist", "Research Assistant", "Behavioral Technician"],
      masters: ["Clinical Psychologist", "Industrial-Organizational Psychologist", "Counselor"],
    },
    college_overview:
      "A bachelor's takes about 4 years and a master's 2–3 years, with a difficulty rating of 6/10 due to conceptual but less technical coursework.",
    day_in_life:
      "Psychology graduates may spend their days conducting assessments, meeting clients, or analyzing behavioral data. They usually work 35–45 hours weekly, often in offices or clinics. Average salaries range from $50,000–$100,000, with a generally healthy work-life balance.",
    byu_courses: [
      "PSYCH 111: Introduction to Psychological Science",
      "PSYCH 210: Statistics in Psychological Research",
      "PSYCH 381: Behavioral Neuroscience",
    ],
  },
]);

    useEffect(()=>{
        const fetchData = async () => {
            const responce = await fetch('http://127.0.0.1:8000/recommend', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({responses:answers})
            })
            if(!responce.ok){
                throw new Error("http error!");
            }
            setMajors(await responce.json());
        };
        fetchData();
    })
    
    return(<>
    <div>
        <a>
          <img src={launchPadLogo} className="logo" onClick={() => {navigate("/Features")}} />
        </a>
      </div>
    <Majors data={majorInfo} />
    </>);
}

export default Results