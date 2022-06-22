import React from "react";
import trav from "../../assets/digging.png";

const Travaux = () => {
  return (
    <div className="container">
      <img src={trav} style={{ width: "250px", height: "250px" }} />
      <h3 className="container"> travaux en cours</h3>
    </div>
  );
};

export default Travaux;
