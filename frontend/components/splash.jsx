import React from 'react';
import { withRouter } from 'react-router-dom'
const VIDEO_URL = "https://www.meetup.com/mu_static/en-US/dddafbfe4574fc19c6718950691dcb78.mp4"; // eslint-disable-line max-len
const Splash = (props) => {
  return (
    <main className="splash">
      <video
        autoPlay
        loop
        className="splash-video"
        >
        <source
          src={VIDEO_URL}
          type="video/mp4"
        />Your browser does not support the video tag.</
      video>
      <section className="splash-section">
        <h1>What do you love?</h1>
        <h3>Do more of it with WeMeet</h3>
        <div
          className="splash-section-button"
          onClick={()=>props.history.push('/signup')}
        >
          <span>Sign Up</span>
        </div>
      </section>
    </main>
  );
};

export default withRouter(Splash);
