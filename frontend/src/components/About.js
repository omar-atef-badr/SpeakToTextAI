import colorSharp from "../assets/img/color-sharp.png"
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import TrackVisibility from 'react-on-screen';
import { useState } from 'react';
import websocketLogo from '../assets/img/websocket.svg'

export const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="about-bx wow zoomIn">
              <Container className="about-section-container">
                <Row>
                  <Col>
                    <TrackVisibility>
                      {({ isVisible }) => 
                        <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                          <h2 className="section-title">About</h2>
                          
                          <Tab.Container id="about-tabs" defaultActiveKey="overview" onSelect={(k) => setActiveTab(k)}>
                            <Nav variant="pills" className="nav-pills justify-content-center">
                              <Nav.Item>
                                <Nav.Link eventKey="overview">Overview</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="features">Features</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="team">Our Team</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link eventKey="tech">Tech Stack</Nav.Link>
                              </Nav.Item>
                            </Nav>
                            
                            <Tab.Content>
                              <Tab.Pane eventKey="overview">
                                <div className="tab-content-box">
                                  <p>
                                    TalkToTexty is an innovative real-time speech-to-text web application powered by 
                                    cutting-edge AI technology. Designed to seamlessly convert spoken words into text 
                                    with exceptional accuracy, this project marks the beginning of Omar's and Ali's 
                                    journey in creating impactful AI-driven solutions.
                                  </p>
                                  <div className="interactive-callout">
                                    <div className="pulse-icon">▶</div>
                                    <p>Click to watch our demo</p>
                                  </div>
                                </div>
                              </Tab.Pane>
                              
                              <Tab.Pane eventKey="features">
                                <div className="feature-tiles">
                                  {[
                                    {
                                      title: 'Real-time Transcription', 
                                      desc: 'Convert speech to text instantly with minimal latency and perfect precision.'
                                    },
                                    {
                                      title: 'High Accuracy', 
                                      desc: 'Advanced AI models ensure precise transcription even in noisy environments.'
                                    },
                                    {
                                      title: 'Multi-language Support', 
                                      desc: 'Seamlessly transcribe speech in multiple languages with native-level accuracy.'
                                    },
                                    {
                                      title: 'Voice Commands', 
                                      desc: 'Control the application hands-free with intuitive voice command recognition.'
                                    }
                                  ].map((feature, index) => (
                                    <div className="col-md-6" key={index}>
                                      <div className="feature-tile">
                                        <div className="feature-icon"></div>
                                        <h4>{feature.title}</h4>
                                        <p>{feature.desc}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </Tab.Pane>
                              
                              <Tab.Pane eventKey="team">
                                <Row className="team-section">
                                  {[
                                    {
                                      name: 'Omar', 
                                      role: 'AI Engineer & Frontend Developer', 
                                      bio: 'Passionate about revolutionising the finance and healthcare sector using AI and applying my foundations in theoretical computer science',
                                      avatar: 'https://media.licdn.com/dms/image/v2/D5603AQEpnAjTvmdG-w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1726183725518?e=2147483647&v=beta&t=CpXthuyGw2ca2sQz2K7bnIM4yj6xxKkqUdevOCTqexg',
                                      linkedin: 'https://www.linkedin.com/in/omar-atef-badr/',
                                      github: 'https://github.com/omar-atef-badr'
                                    },
                                    {
                                      name: 'Ali', 
                                      role: 'Backend Developer & ML Specialist', 
                                      bio: 'Strong interest in technology and its potential to drive innovation. I’m particularly passionate about Python development and its use in the field of data science',
                                      avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQFbcEGT26fSWg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1723062275093?e=2147483647&v=beta&t=0Z8K4QTNWlefjvG_fvRR_FeM3NOYEXI4AQh8y95lzuI',
                                      linkedin: 'https://www.linkedin.com/in/aliamerics/',
                                      github: 'https://github.com/AliAmeri1996'
                                    }
                                  ].map((member, index) => (
                                    <Col xs={12} md={6} key={index}>
                                      <div className="team-card">
                                        <div className="member-avatar">
                                          <img 
                                            src={member.avatar} 
                                            alt={`${member.name}'s profile`} 
                                            className="profile-image"
                                          />
                                        </div>
                                        <h4>{member.name}</h4>
                                        <h5>{member.role}</h5>
                                        <p>{member.bio}</p>
                                        <div className="social-links">
                                          <a 
                                            href={member.github} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="social-icon github"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                          </a>
                                          <a 
                                            href={member.linkedin} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="social-icon linkedin"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                            </svg>
                                          </a>
                                        </div>
                                      </div>
                                    </Col>
                                  ))}
                                </Row>
                              </Tab.Pane>

                              <Tab.Pane eventKey="tech">
                                <div className="tech-stack-container">
                                  <div className="tech-stack-grid">
                                    {[
                                      { 
                                        name: 'React', 
                                        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
                                        url: 'https://reactjs.org' 
                                      },
                                      { 
                                        name: 'FastAPI', 
                                        logo: 'https://cdn.worldvectorlogo.com/logos/fastapi-1.svg',
                                        url: 'https://fastapi.tiangolo.com/' 
                                      },
                                      { 
                                        name: 'OpenAI Whisper', 
                                        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
                                        url: 'https://openai.com/research/whisper' 
                                      },
                                      { 
                                        name: 'WebSocket', 
                                        logo: websocketLogo,
                                        url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API' 
                                      }
                                    ].map((tech, index) => (
                                      <a 
                                        key={index} 
                                        href={tech.url} 
                                        className="tech-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img 
                                          src={tech.logo} 
                                          alt={`${tech.name} logo`} 
                                          className="tech-logo" 
                                        />
                                        <span className="tech-name">{tech.name}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </Tab.Container>
                        </div>
                      }
                    </TrackVisibility>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Background" />
    </section>
  );
};
