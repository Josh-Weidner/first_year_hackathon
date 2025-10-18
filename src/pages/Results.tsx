import {AnswerSet, MajorList} from "../datatypes/types"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Results.css';

const major_descriptions: Record<string, string> = {
  "Accounting": "Focuses on recording, analyzing, and reporting financial transactions for businesses and organizations.",
  "Finance": "Studies managing money, investments, banking, and financial planning for individuals and organizations.",
  "Marketing": "Covers strategies for promoting, selling, and distributing products and services to target audiences.",
  "Management": "Prepares students to lead teams, organize resources, and oversee business operations effectively.",
  "International Business": "Explores global trade, cross-cultural management, and multinational business strategies.",
  "Business Analytics": "Applies data analysis and statistical methods to help organizations make informed business decisions.",
  "Entrepreneurship": "Focuses on starting and managing new businesses, innovation, and opportunity recognition.",
  "Mechanical Engineering": "Designs, analyzes, and builds mechanical systems, machines, and devices.",
  "Civil Engineering": "Plans, designs, and maintains infrastructure like roads, bridges, and buildings.",
  "Electrical Engineering": "Works with electrical systems, circuits, and electronic devices for a variety of applications.",
  "Chemical Engineering": "Applies chemistry, physics, and biology to develop processes for manufacturing chemicals and materials.",
  "Biomedical Engineering": "Combines engineering and biology to design medical devices, prosthetics, and healthcare technologies.",
  "Aerospace Engineering": "Focuses on designing, testing, and manufacturing aircraft and spacecraft.",
  "Industrial Engineering": "Optimizes complex systems, processes, and operations for efficiency and safety.",
  "Computer Science": "Covers programming, algorithms, software development, and computational problem-solving.",
  "Information Systems": "Studies how to design, implement, and manage information systems in organizations.",
  "Software Engineering": "Focuses on designing, developing, and maintaining software applications.",
  "Cybersecurity": "Protects computer systems and networks from digital attacks and unauthorized access.",
  "Data Science": "Analyzes large datasets to uncover patterns, insights, and support decision-making.",
  "Biology": "Studies living organisms, their structures, functions, and interactions with the environment.",
  "Biochemistry": "Explores chemical processes and substances that occur within living organisms.",
  "Microbiology": "Focuses on microorganisms, including bacteria, viruses, and fungi, and their effects on health and the environment.",
  "Molecular Biology": "Examines biological activity at the molecular level, including DNA, RNA, and proteins.",
  "Genetics": "Studies heredity, gene function, and genetic variation in living organisms.",
  "Neuroscience": "Investigates the nervous system, brain function, and behavior.",
  "Political Science": "Analyzes political systems, government structures, policies, and public affairs.",
  "Sociology": "Studies society, social behavior, and the relationships among individuals and groups.",
  "Economics": "Examines the production, distribution, and consumption of goods and services.",
  "Anthropology": "Explores human cultures, evolution, and social development across time.",
  "International Relations": "Studies global politics, diplomacy, and relations between nations.",
  "Geography": "Examines physical landscapes, human-environment interactions, and spatial patterns.",
  "Psychology": "Investigates human thought, behavior, and mental processes.",
  "Nursing": "Prepares students to provide patient care, promote health, and support medical treatment.",
  "Public Health": "Focuses on improving community health, disease prevention, and health policy.",
  "Physical Therapy": "Trains students to help patients recover mobility and function after injury or illness.",
  "Elementary Education": "Prepares teachers to educate young children in primary school settings.",
  "Secondary Education": "Trains teachers to educate adolescents in middle and high schools.",
  "Special Education": "Focuses on teaching students with diverse learning needs and disabilities.",
  "Early Childhood Education": "Prepares educators to support learning and development in children from birth to age eight."
}

const Results: React.FC = () => {
    const {state} = useLocation();
    const [majors, setMajors] = useState<MajorList>();
    const answers: AnswerSet = state;

    useEffect(()=>{
        const fetchData = async () => {
            const responce = await fetch('http://127.0.0.1:8000/recomend', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(answers)
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
        {answers.q1}
    </div>
    {majors?.recomendations.forEach((m)=>{
        <div>
        <span className='title'>{m.major}: </span>
        <span>{major_descriptions[m.major]}</span>
        <span className='prob'>{m.probabilty}</span>
        </div>
    })}
    </>);
}

export default Results