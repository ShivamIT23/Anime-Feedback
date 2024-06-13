
import AnimeBackground from '/AnimeBackground1.png'
import backbox from '/back-box.png';
import { NavBar } from './NavBar/NavBar'
import { Heading } from './Components/Heading';
// import { BrowserRouter , Route , Routes } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Button } from './Components/Button';
import EastIcon from '@mui/icons-material/East';


function App() {
  const cursorCircle = useRef(null);
  useGSAP(() => {
    window.addEventListener("mousemove", function (dets) {
      gsap.to(cursorCircle.current, {
        duration:.8,
        left: dets.x,
        top: dets.y,
      });
    });
  });

  return (
    <>
    <div ref={cursorCircle} id='crsr'></div>
    <div className='App'>
        <NavBar />
        <Heading />
        <Button> Get Started <sub><EastIcon/></sub></Button>
          <img src={AnimeBackground} className="logo" alt="Background-girl" />
          <img src={backbox} className='App-box' alt="Box-back" />
      </div>
    </>
  )
}

export default App
