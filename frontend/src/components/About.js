import colorSharp from "../assets/img/color-sharp.png";

export const About = () => {
  return (
    <section className="about" id="abouts">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="about-box wow zoomIn">
              <h2>About</h2>
              <p>
              TalkToTexty is an innovative real-time speech-to-text web application powered by cutting-edge AI technology. Designed to seamlessly convert spoken words into text with exceptional accuracy, this project marks the beginning of Omar's and Ali's journey in creating impactful AI-driven solutions.
               <br />
               Whether for accessibility, productivity, or creative uses, TalkToTexty transforms how we interact with speech and text.
              </p>
              <div className="skills-list">
                <div className="skill-item">
                  <h5>FastAPI</h5>
                </div>
                <div className="skill-item">
                  <h5>OpenAI Whisper</h5>
                </div>
                <div className="skill-item">
                  <h5>React</h5>
                </div>
                <div className="skill-item">
                  <h5>JavaScript</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Background" />
    </section>
  );
};