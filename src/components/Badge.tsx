import React from "react";
import { BadgeProps } from "../types";
import { GiDogHouse } from "react-icons/gi"
import { useNavigate } from "react-router";

const Badge: React.FC<BadgeProps> = ({ count, selectedDogs }) => {

  const navigate = useNavigate()
  return (
    <div className="badge-container">
      <button className="badge-button" onClick={() => navigate("/Match", { state: { selectedDogs } })}><GiDogHouse/></button>
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
};

export default Badge;
