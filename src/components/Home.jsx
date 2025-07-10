// export default function Home({ age }) {
//     if(age>18) return <h2>Welcome</h2>;
//     else return <h2>Not allowed</h2>
// }

// export default function Home({ age }) {
//     return (age>18)?<h2>Welcome</h2>:<h2>Not allowed</h2>;
// }

// export default function Home({ age }) {
//     const handleClick = ()=>{
//         alert("Hello");
//     }

//     const handleSubmit = (name)=>{
//         alert(`Hello ${name}`);
//     }

//     return(
//         <>
//         <h2>Hello world</h2>
//         <button onClick={handleClick}>Click</button>
//         <button onClick={()=>handleSubmit("John")}>Submit</button>
//         </>
//     )

// }

// import { useState } from "react";
// export default function Home(){
//     const[score,setScore]= useState(0);
//     const increment = () =>{
//         setScore(score+1);
//     }
//     const decrement = ()=>{
//         setScore(score-1);
//     }
//     return(
//         <center>
//         <p>{score}</p>
//         <button onClick={increment}>Increment Score</button>
//         <button onClick={decrement}>Decrement Score</button>
//         </center>
//     )
// }

import { useState } from "react";
export default function Home() {
  const [score, setScore] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [result, setResult] = useState("");
  const getRuns = () => {
    if (wicket < 10) {
      setScore(score + 1);
      setResult("Well Done");
    } else {
      setResult("Game Over");
    }
  };
  const getWickets = () => {
    if (wicket < 10) {
      setWicket(wicket + 1);
      setResult("Out");
    } else {
      setResult("Game Over");
    }
  };
  return (
    <center>
      <div style={{display: "flex", justifyContent:"center", alignItems:"center", gap:"20px"}}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <button onClick={getRuns}>Runs</button>
            <p>{score}</p>
          </div>
          <div>
            <button onClick={getWickets}>Wickets</button>
            <p>{wicket}</p>
          </div>
        </div>
      <div>
        <p>{result}</p>
      </div>
      </div>
    </center>
  );
}
