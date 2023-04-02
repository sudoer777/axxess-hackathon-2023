import { useState } from 'react'


function App(this: any) {
  const [query, setQuery] = useState("");
  function handleSubmit(e: { preventDefault: () => void; target: any; }) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    //const form = e.target;
    //const formData = new FormData(form);
    console.log({query});
    //You can pass formData as a fetch body directly:
    fetch('/api/v0/query', { method: 'POST', body: query });

    // Or you can work with it as a plain object:
    //const formJson = Object.fromEntries(formData.entries());
    //console.log(formJson);
  }

  return (
    <div className="App">
      <div className="relative mb-4 flex flex-wrap max-w-fit w-screen">
        <form onSubmit={handleSubmit}>
          <input
            type = 'text'
            onChange={(e) => setQuery(e.target.value)}
            className="queryBar shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          <input type='submit'/>
        </form>
      </div>      
      <div className = "suggestions">
        <button>Suggestion 1</button>
        <button>Suggestion 2</button>
        <button>Suggestion 3</button>
      </div>
        
      <div className = "response flex flex-wrap max-w-fit max-h-fit w-screen h-screen color:200">
        <a target="_blank">
          <img className="logo" alt="Vite logo" />
        </a>
      </div>
    </div>
    
  
  )
}

export default App
