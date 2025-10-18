import {AnswerSet, Major} from "../datatypes/types"
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import './Results.css';

const Results: React.FC = () => {
    const {state} = useLocation();
    const [majors, setMajors] = useState<Major[]>([]);
    const answers: AnswerSet = state;

    useEffect(()=>{
        const fetchData = async () => {
            const responce = await fetch('/get_major', {
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
    {majors.forEach((m)=>{
        <div>
        <span className='title'>{m.title}: </span>
        <span className='desc'>{m.descriptioin}</span>
        </div>
    })}
    </>);
}

export default Results