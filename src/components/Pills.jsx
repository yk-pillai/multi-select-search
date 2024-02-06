import React from "react";

const Pills = ({ selected, handlePillClick }) => {
  return (
    <>
      {Array.from(selected.keys()).map((email) => {
        return (
          <div className="pill" key={email} onClick={() => handlePillClick(email)}>
            {selected.get(email)} &times;
          </div>
        );
      })}
    </>
  );
};

export default Pills;
