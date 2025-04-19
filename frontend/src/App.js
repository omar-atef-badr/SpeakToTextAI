import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { About } from "./components/About";
import { Demo } from "./components/Demo";
import { Footer } from "./components/Footer";
import Recorder from "./components/Recorder";


function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <About />
      <Recorder />
      <Demo />
      <Footer />
    </div>
  );
}

export default App;
