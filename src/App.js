import { useState } from "react";
import Navbar from "./components/Navbar";
import { Configuration, OpenAIApi } from "openai";


function App() {
//   const apiKey='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'
   const apiKey=`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`
  const configuration = new Configuration({
    organization: "org-dtEIdqc1TzWQY8UYA6a3Xep6",
    apiKey: apiKey,
});


  const [question,setQuestion]=useState("")
  const chats=document.getElementById('send')
  
  const onClick=async(e)=>{
    const questionElement=document.getElementById('question').value=""
    
    chats.innerHTML=chats.innerHTML+`<div class="send chat text-white">
    <p>${question}</p>
    </div>`
    


const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: question,
  max_tokens: 4000,
  temperature: 0,
});

const a=response.data.choices[0].text.split('\n').filter((value)=>value).map(value=>value.trim())
    // console.log(a);
    const b=a.forEach(element=>{return `<p>${element}</p>`})
  console.log(b);
  

    chats.innerHTML=chats.innerHTML+`<div class="recieve chat text-white">
    <p>${a}</p>
  </div>`

    
  }

  const OnChange=(e)=>{
    setQuestion(e.target.name=e.target.value)
  }

  return (
    <>
    <Navbar/>
    <div>
      <h1 className="text-white text-center">Welcome To LKH AI </h1>
      
      </div>
    <div className="container">
      <div className="chats" id="send">

        <div className="recieve chat text-white">
          <p>Hi Human ,How Can i help you?</p>
        </div>
      </div>
      <div className="chat-input">
        <input type="text" id ="question" name="question" className="form-control col" onChange={OnChange} placeholder="Type Somethings"/>
      <button className="btn btn-success" id="submitBtn" onClick={onClick}>Send</button>
      </div>
    </div>
    </>
  );
}

export default App;
