import React from "react";

const Footer = props => {
  return (
    <footer className="footer">
      <span>Created with love by Aaron Young</span>
      <div>
        <a
          href="https://www.linkedin.com/in/aaron-young2018/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin" />
        </a>
        <a
          href="https://github.com/brainomite/we-meet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
