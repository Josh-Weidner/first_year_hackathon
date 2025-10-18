import launchPadLogo from '../assets/launchPad Logo.png'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { AnswerSet } from '../datatypes/types';

import './Questions.css'

const SurveyPage: React.FC = () => {
    const navigate = useNavigate()

  const handleSubjectChange = (subject: string) => {
    if (q1.includes(subject)) {
      setQ1(q1.filter((s) => s !== subject));
    } else if (q1.length < 3) {
      setQ1([...q1, subject]);
    }
  };

  const handleAvoidChange = (subject: string) => {
    if (q11.includes(subject)) {
      setQ11(q11.filter((s) => s !== subject));
    } else if (q11.length < 3) {
      setQ11([...q11, subject]);
    }
  };

  // Radio questions
  const [q1, setQ1] = useState<string[]>([]);
  const [q2, setQ2] = useState<string>("");
  const [q3, setQ3] = useState<string>("");
  const [q4, setQ4] = useState<string>("");
  const [q5, setQ5] = useState<string>("");
  const [q6, setQ6] = useState<string>("");
  const [q7, setQ7] = useState<string>("");
  const [q8, setQ8] = useState<string>("");
  const [q9, setQ9] = useState<string>("");
  const [q10, setQ10] = useState<string>("");
  const [q11, setQ11] = useState<string[]>([]);

  const q1_Options = ["Math", "Biology", "Chemistry", "Physics", "Computer Science", "Economics", "History", "English", "Art", "Psychology", "Music", "Other"];
  const q2_Options = ["Structured", "Open-ended", "Mix"];
  const q3_Options = ["Solving logic puzzles or programming challenges", "Designing visual content", "Debating social or ethical issues", "Running experiments or collecting data", "Helping people one-on-one"];
  const q4_Options = ["I like understanding how systems work", "I like expressing ideas creatively", "I like understanding people and behavior", "I like analyzing and organizing information", "I like building or improving physical things"];
  const q5_Options = ["Mastering complex problems", "Helping others", "Creating something new", "Gaining financial stability", "Understanding truth or meaning"];
  const q6_Options = ["Job security", "Creativity and self-expression", "Helping others", "High income", "Intellectual challenge", "Work-life balance"];
  const q7_Options = ["Love it", "Comfortable", "Neutral", "Avoid it"];
  const q8_Options = ["Love it", "Comfortable", "Neutral", "Avoid it"];
  const q9_Options = ["Independently", "In small teams", "In large organizations", "Teaching or mentoring others"];
  const q10_Options = ["Yes", "Somewhat", "Not important"];
  const q11_Options = ["Labs", "Writing", "Group projects", "Coding", "Public speaking", "Math"];

  // Render multi-choice two-column checkboxes (button to the left)
  const renderTwoColumnOptions = (
    options: string[],
    selected: string[],
    onChange: (option: string) => void,
    limit?: number
  ) => {
    const mid = Math.ceil(options.length / 2);
    const leftColumn = options.slice(0, mid);
    const rightColumn = options.slice(mid);

    const columnStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        } as const;

    const renderOption = (option: string) => (
      <label
        key={option}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          gap: "0.5rem",
        }}
      >
        <input
          type="checkbox"
          checked={selected.includes(option)}
          onChange={() => onChange(option)}
          disabled={!!limit && !selected.includes(option) && selected.length >= limit}
        />
        <span>{option}</span>
      </label>
    );

    return (
      <div style={{ display: "flex", justifyContent: "center", gap: "4rem", marginTop: "1rem" }}>
        <div style={columnStyle}>{leftColumn.map(renderOption)}</div>
        <div style={columnStyle}>{rightColumn.map(renderOption)}</div>
      </div>
    );
  };

  // Render radio buttons horizontally, button above text
  const renderHorizontalRadioOptions = (
    options: string[],
    selected: string,
    onChange: (option: string) => void
  ) => (
    <div style={{ display: "flex", justifyContent: "center", gap: "3rem", marginTop: "1rem" }}>
      {options.map((option) => (
        <label
          key={option}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            gap: "0.5rem",
          }}
        >
          <input
            type="radio"
            checked={selected === option}
            onChange={() => onChange(option)}
            name={option} // ensures single selection
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  );

  const handleSubmit = () => {
    const answers: AnswerSet = {
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4,
        q5: q5,
        q6: q6,
        q7: q7,
        q8: q8,
        q9: q9,
        q10: q10,
        q11: q11,
    }

    navigate("/Results", { state: answers});
  }

  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <div>
        <a>
          <img src={launchPadLogo} className="logo" onClick={() => {navigate("/Features")}} />
        </a>
      </div>
      {/* Question 1 */}
      <h2>Which high school subjects did you enjoy most? (Select up to 3)</h2>
      {renderTwoColumnOptions(q1_Options, q1, handleSubjectChange, 3)}
      <p style={{ marginTop: "0.5rem", color: "#666" }}>
        Selected: {q1.join(", ") || "None"}
      </p>

      {/* Question 2 */}
      <h2 style={{ marginTop: "2rem" }}>Do you prefer structured problems or open-ended problems?</h2>
      {renderHorizontalRadioOptions(q2_Options, q2, setQ2)}

      {/* Question 3 */}
      <h2 style={{ marginTop: "2rem" }}>You would rather spend a day…</h2>
      {renderHorizontalRadioOptions(q3_Options, q3, setQ3)}

      {/* Question 4 */}
      <h2 style={{ marginTop: "2rem" }}>Which statement feels most like you?</h2>
      {renderHorizontalRadioOptions(q4_Options, q4, setQ4)}

      {/* Question 5 */}
      <h2 style={{ marginTop: "2rem" }}>Which motivates you more?</h2>
      {renderHorizontalRadioOptions(q5_Options, q5, setQ5)}

      {/* Question 6 */}
      <h2 style={{ marginTop: "2rem" }}>What is more important in your future career?</h2>
      {renderHorizontalRadioOptions(q6_Options, q6, setQ6)}

      {/* Question 7 */}
      <h2 style={{ marginTop: "2rem" }}>How do you feel about math-heavy work?</h2>
      {renderHorizontalRadioOptions(q7_Options, q7, setQ7)}

      {/* Question 8 */}
      <h2 style={{ marginTop: "2rem" }}>How do you feel about people-focused work?</h2>
      {renderHorizontalRadioOptions(q8_Options, q8, setQ8)}

      {/* Question 9 */}
      <h2 style={{ marginTop: "2rem" }}>Would you rather work…</h2>
      {renderHorizontalRadioOptions(q9_Options, q9, setQ9)}

      {/* Question 10 */}
      <h2 style={{ marginTop: "2rem" }}>Is it important that your work has a visible societal impact?</h2>
      {renderHorizontalRadioOptions(q10_Options, q10, setQ10)}

      {/* Question 11 */}
      <h2>What kind of coursework do you tend to avoid? (Select up to 3)</h2>
      {renderTwoColumnOptions(q11_Options, q11, handleAvoidChange, 3)}
      <p style={{ marginTop: "0.5rem", color: "#666" }}>
        Selected: {q11.join(", ") || "None"}
      </p>

      <button className="button" onClick={() => {handleSubmit()}}>
        Submit
      </button>
    </div>
  );
};

export default SurveyPage;