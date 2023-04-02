import React from 'react';
import { useState } from 'react'
import ReactDOM from 'react-dom';
import Slideshow from './components/slideshow';

import QuestionsButtons, { QuestionProps, SuggestionBox } from './components/suggestion';

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
  // Array of Q&A Objects
  //Instantiates Question Array Object
  const questionSuggestionConst = {
    questionSuggestion: [
      { title: 'Cabbage', id: 1 },
      { title: 'Garlic', id: 2 },
      { title: 'Apple', id: 3 },
      { title: 'Turkey', id: 4},
    ]
};
  //Array of images
  //Instantiates images
  const images = [
    {
      url: 'https://source.unsplash.com/random/800x600',
      alt: 'Image 1',
    },
    {
      url: 'https://source.unsplash.com/random/800x600?nature',
      alt: 'Image 2',
    },
    {
      url: 'https://source.unsplash.com/random/800x600?water',
      alt: 'Image 3',
    },
    {
      url: 'https://source.unsplash.com/random/800x600?mountain',
      alt: 'Image 4',
    },
  ];

  const [query, setQuery] = useState('');
  const [chatComponent, setChatComponents] = useState([<></>]);
  const [response, setResponse] = useState([]);
  const [simages, setImages] = useState([]);
  const [questionSuggestion, setQuestionSuggestion] = useState<QuestionProps>(questionSuggestionConst);


  function handleSubmit(e: { preventDefault: () => void; target: any; }) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    //const form = e.target;
    //const formData = new FormData(form);
    console.log({query});
    //You can pass formData as a fetch body directly:
    fetch('http://localhost:8000/api/v0/query', { method: 'POST', body: JSON.stringify({query}) }) //nEED TO HAVE IT so it changes based on response
          .then((res) => res.json())
          .then((json) => {
            setChatComponents([...chatComponent, (
              <div>
                <span>{query}</span>
                <div>{json.message}</div>
                {json.images.map((image: string) => <img src = {image}/>)}
              </div>)])
          });
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
      <Slideshow images={images} />

      <div className = "justify-center grid grid-flow-row-dense grid-cols-3 grid-rows-3">
        <SuggestionBox></SuggestionBox>
        <QuestionsButtons questionSuggestion={questionSuggestion.questionSuggestion} />
        <button>Suggestion 1</button>
        <button>Suggestion 2</button>
        <button>Suggestion 3</button>
      </div>
      <div className = "response flex flex-wrap max-w-fit max-h-fit w-screen h-screen color:200">
        
      </div>
      <div className = "response flex flex-wrap max-w-fit max-h-fit w-screen h-screen bg-gray">
        {chatComponent}
      </div>
    </div>
    
  
  )
}

export default App
