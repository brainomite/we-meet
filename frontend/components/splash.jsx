import React from 'react';

const Splash = (props) => {
  return (
    <main>
      <video
        autoPlay
        loop
        className="splash-video"
        >
        <source
          src="https://www.meetup.com/mu_static/en-US/dddafbfe4574fc19c6718950691dcb78.mp4"
          type="video/mp4"
          />Your browser does not support the video tag.</
          video>
          <h1>stuff!</h1>
    </main>
  );
};

export default Splash;
