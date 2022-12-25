import React from "react";

import { FaGithub } from "react-icons/fa";

const btnStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  padding: "10px",
  zIndex: "1",
  fontSize: "40px",
  border: "none",
  width: "60px",
  height: "60px",
  borderRadius: "10px",
};

const GithubButton = () => {
  return (
    <button style={btnStyle} id="GithubButton">
      <a href="https://github.com/kenny101/cbp-visualizer" target="_blank">
        <FaGithub />
      </a>
    </button>
  );
};

export default GithubButton;
