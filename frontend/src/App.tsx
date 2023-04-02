import React from 'react';
import { useState } from 'react'
import ReactDOM from 'react-dom';

function response(query: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, response1: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, img: string | undefined) {
  return (
    <div>
      <h1>{query.value}</h1>
      <img src={img} alt="Loading"></img>
      <p>{response1}</p>
    </div>
  );
}

function App(this: any) {
  const [query, setQuery] = useState("");
  const [chatComponent, setChatComponents] = useState([<></>]);
  const [response, setResponse] = useState([]);
  const [simages, setImages] = useState([]);
  function handleSubmit(e: { preventDefault: () => void; target: any; }) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    //const form = e.target;
    //const formData = new FormData(form);
    console.log({query});
    //You can pass formData as a fetch body directly:
    setChatComponents([...chatComponent, (
      <div>
        <span>{query}</span>
        <div>{response?.[0]}</div>
        <img src = {response?.[0]}/>
      </div>)])
    fetch('/api/v0/query', { method: 'POST', body: query }) //nEED TO HAVE IT so it changes based on response
          .then((res) => res.json())
          .then((json) => setResponse(json));
    fetch('/api/v0/query1', { method: 'POST', body: query }) //nEED TO HAVE IT so it changes based on response
          .then((res) => res.json())
          .then((json) => setImages(json));
    // Or you can work with it as a plain object:
    //const formJson = Object.fromEntries(formData.entries());
    //console.log(formJson);

  }

  return (
    <div className="App">
      <div className="relative mb-4 flex flex-nowrap max-w-fit w-screen justify-center content-center py-8">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type = 'text'
            onChange={(e) => setQuery(e.target.value)}
            className="queryBar shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          <input type='submit'/>
        </form>
      </div>      
      <div className = "flex justify-center ">
        <button>Suggestion 1</button>
        <button>Suggestion 2</button>
        <button>Suggestion 3</button>
      </div>
      <div className = "response flex flex-wrap max-w-fit max-h-fit w-screen h-screen color:200">
        
      </div>
      <div className = "response flex flex-wrap max-w-fit max-h-fit w-screen h-screen color:200">
        {chatComponent}
      </div>
    </div>
    
  
  )
}

export default App
