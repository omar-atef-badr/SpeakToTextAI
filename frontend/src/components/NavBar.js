import { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }
    , []);

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    return (
        <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="#home">TalkToTexty</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <span className="navbar-toggler-icon" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className={activeLink === 'home'? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="#demo" className={activeLink === 'demo'? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('demo')}>Demo</Nav.Link>
                <Nav.Link href="#about" className={activeLink === 'about'? 'active navbar-link' : 'navbar-link' }onClick={() => onUpdateActiveLink('about')}>About</Nav.Link>
            </Nav>
            <span className="navbar-text">
                <div className="social-icon">
                    <a href="#"><img src="someImg" alt=""></img></a>
                </div>
                <button className="vvd" onClick={() => console.log("connect")}><span>Let's connect</span></button>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}