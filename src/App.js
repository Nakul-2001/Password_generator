import { useCallback, useEffect, useState,useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin:50px auto;
  width:700px;
  height:140px;
  background: #3c3c4a;
  border-radius: 10px 10px 10px 10px;
  box-sizing:border-box;
`

const Input = styled.input`
  font-size:25px;
  margin:10px 0 0 40px;
  width:500px;
  height:35px;
  border-radius: 10px 0px 0px 10px;
  outline: none;
  border:none;
  padding: 2px;
  background-color:white;
  color:orange;
  cursor:not-allowed;
`

const Button = styled.button`
  color: white;
  font-weight:bolder;
  font-size:20px;
  margin:15px 40 0 0px;
  height:40px;
  border-radius: 0px 10px 10px 0px;
  border:none;
  padding: 0px;
  width: 100px;
  background-color:blue;
  cursor: pointer;
`

const Lable = styled.label`
  color:orange;
  background-color:#3c3c4a;
  font-style:bold;
  font-size:30px;
  margin-right: 20px;
`

const Slider = styled.input`
  margin:10px 0px 0px 40px;
  cursor: pointer;
`

const Number = styled.input`
  margin:10px;
  cursor: pointer;
`

const Character = styled.input`
  margin:10px;
  cursor: pointer;
`


function App() {

  const [password,setPassword] = useState("");
  const [length,setLength] = useState(8);
  const [numAllowed,setnumallowed] = useState(false);
  const [charAllowed,setcharallowed] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{

    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "`~!@#$%^&*(){}[]";

    for(let i=1;i<=length;i++){
      let ind = Math.floor(Math.random()*str.length);
      pass += str[ind];
    }

    setPassword(pass);

  },[length,numAllowed,charAllowed]);

  useEffect(()=>{
    passwordGenerator();
  },[numAllowed,charAllowed,length,passwordGenerator])

  return (
    <>
    
    <Container>

    <div style={{margin:"10px 0 0 0", backgroundColor:"inherit", color:"orange", textAlign:"center", fontSize:"30px" , fontStyle:"bold" , textDecoration:"underline"}}>Password Generator</div>
    <Input id="input" value={password} readOnly ref={passwordRef}></Input>

    <Button onClick={()=>{passwordRef.current?.select(); window.navigator.clipboard.writeText(password);}}>COPY</Button>
    
    <Slider type="range" min={8} max={16} value={length} id="slider" onChange={(e)=>{setLength(e.target.value)}}></Slider>
    <Lable for="slider">Length:{length}</Lable>

    <Number id="num" type="checkbox" onChange={()=>{setnumallowed(!numAllowed)}}></Number>
    <Lable for="num">Number</Lable>

    <Character type="checkbox" id="char" onChange={()=>{setcharallowed(!charAllowed)}}></Character>
    <Lable for="char">Character</Lable>

    </Container>
    </>
  );
}

export default App;
