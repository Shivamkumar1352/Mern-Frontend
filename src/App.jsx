import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
function App() {
  return (
    <div className="App-Container">
      {/* <h1 style={{ backgroundColor: "antiquewhite" }}>MERN Frontend</h1> */}
      {/* <Home age={21}/> */}
      <Register/>
      {/* <h3>This is footer</h3> */}
    </div>
  );
}
export default App;