import { Container, Row, Col } from "react-bootstrap";
import githubIcon from "../assets/img/github.png";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-start footer-main-row">
          <Col xs={12} lg={3} className="mb-4 mb-lg-0">
            <div className="footer-section">
              <h3 className="footer-logo">TalkToTexty</h3>
              <p className="footer-description">
                Converting speech to text with exceptional accuracy.
              </p>
            </div>
          </Col>
          
          <Col xs={12} lg={3} className="mb-4 mb-lg-0">
            <div className="footer-section">
              <h5 className="footer-heading">Navigation</h5>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#demo">Demo</a></li>
              </ul>
            </div>
          </Col>
          
          <Col xs={12} lg={3} className="mb-4 mb-lg-0">
            <div className="footer-section">
              <h5 className="footer-heading">Resources</h5>
              <ul className="footer-links">
                <li><a href="#documentation">Documentation</a></li>
                <li><a href="#api">API Reference</a></li>
                <li><a href="https://openai.com/research/whisper" target="_blank" rel="noopener noreferrer">Whisper Model</a></li>
                <li><a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener noreferrer">FastAPI</a></li>
              </ul>
            </div>
          </Col>
          
          <Col xs={12} lg={3} className="mb-4 mb-lg-0">
            <div className="footer-section">
              <h5 className="footer-heading">Stay Connected</h5>
              <div className="social-icons mt-3">
                <a href="https://github.com/omar-atef-badr/SpeakToTextAI" target="_blank" rel="noopener noreferrer" className="social-icon-link">
                  <img src={githubIcon} alt="GitHub" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row className="footer-bottom">
          <Col md={6}>
            <p className="mb-0">© {new Date().getFullYear()} TalkToTexty. All Rights Reserved</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="mb-0">Made with ❤️ by Omar & Ali</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
