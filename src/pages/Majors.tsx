import React from "react";
import "./Majors.css"; 
import { MajorInfo } from "../datatypes/types";

type MajorsDisplayProps = {
  data: MajorInfo[];
};

const MajorsDisplay: React.FC<MajorsDisplayProps> = ({ data }) => {
  return (
    <div className="majors-container">
      {data.map((item, index) => (
        <div key={item.major} className="major-card">
          <h1 className="major-title">{index + 1}. {item.major}</h1>

          <div className="positions-section">
            <h3>Top Positions (Bachelor’s):</h3>
            <p className="positions-list">
              {item.top_positions.bachelors.join(", ")}
            </p>

            <h3>Top Positions (Master’s):</h3>
            <p className="positions-list">
              {item.top_positions.masters.join(", ")}
            </p>
          </div>

          <p className="text-block">
            <strong>College Overview:</strong> {item.college_overview}
          </p>

          <p className="text-block">
            <strong>Day in Life:</strong> {item.day_in_life}
          </p>

          <div>
            <h3>BYU Courses:</h3>
            <ul className="course-list">
              {item.byu_courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MajorsDisplay;