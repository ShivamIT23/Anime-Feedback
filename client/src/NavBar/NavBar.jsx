import { AboutUs } from "./AboutUs";
import { Home } from "./Home";
import { Login } from "./Login";
import { Logo } from "./Logo";
import { Signup } from "./Signup";

export const NavBar = () => {
  return (
    <div className="NavBar">
      <Logo />
    <div className="NavBar-Items">
      <Home />
      <AboutUs />
      <Login />
      <Signup />
      </div>
    </div>
  );
};
