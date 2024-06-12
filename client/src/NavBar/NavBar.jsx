import { AboutUs } from "./AboutUs"
import { Home } from "./Home"
import { Logo } from "./Logo"

export const NavBar = () => {
  return (
    <div className="NavBar">
      <Logo />
        <Home />
        <AboutUs />
        </div>
  )
}
