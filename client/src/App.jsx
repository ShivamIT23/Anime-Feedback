
import viteLogo from '/AnimeBackground1.png'
import backbox from '/back-box.png';
import './App.css'
import { NavBar } from './NavBar/NavBar'

function App() {

  return (
      <div className='App'>
        <NavBar />
          <img src={viteLogo} className="logo" alt="Background-girl" />
          <img src={backbox} className='App-box' alt="Box-back" />
      </div>
  )
}

export default App
