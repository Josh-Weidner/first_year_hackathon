export interface AnswerSet{
    "q1": string[],
    "q2": string,
    "q3": string,
    "q4": string,
    "q5": string,
    "q6": string,
    "q7": string,
    "q8": string,
    "q9": string,
    "q10": string,
    "q11": string[],
}

export interface MajorList{
    recomendations: {
        major: string,
        probabilty: number,
    }[]
}


export interface TopPositions{
  bachelors: string[];
  masters: string[];
};

export interface MajorInfo{
  major: string;
  top_positions: TopPositions;
  college_overview: string;
  day_in_life: string;
  byu_courses: string[];
};
