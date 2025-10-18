import {AnswerSet, MajorList} from "../datatypes/types"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Results.css';

const Results: React.FC = () => {
    const {state} = useLocation();
    const [majors, setMajors] = useState<MajorList>();
    const answers: AnswerSet = state;

    useEffect(()=>{
        const fetchData = async () => {
            const responce = await fetch('/recomend', {
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
        <span className='prob'>{m.probabilty}</span>
        </div>
    })}
    </>);
}

export default Results