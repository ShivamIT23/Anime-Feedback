
import AnimeBackground from '/AnimeBackground1.png'
import backbox from '/back-box.png';
import { NavBar } from './NavBar/NavBar'
import { Heading } from './Components/Heading';
// import { BrowserRouter , Route , Routes } from 'react-router-dom';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';
import Brightness3Icon from '@mui/icons-material/Brightness3';
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
        <button onClick={() => console.log("hii")} className="Start-button"> Get Started <sub><EastIcon/></sub></button>
        <TripOriginOutlinedIcon className='circle1'/>
        <TripOriginOutlinedIcon className='circle2' />
        <TripOriginOutlinedIcon className='circle3' />
        <TripOriginOutlinedIcon className='circle4' />
        <TripOriginOutlinedIcon className='circle5' />
        <Brightness3Icon className='halfCircle1' />
        <Brightness3Icon className='halfCircle2' />
        <Brightness3Icon className='halfCircle3' />
        <Brightness3Icon className='halfCircle4' />
          <img src={AnimeBackground} className="logo" alt="Background-girl" />
          <img src={backbox} className='App-box' alt="Box-back" />
      </div>
    </>
  )
}

export default App
