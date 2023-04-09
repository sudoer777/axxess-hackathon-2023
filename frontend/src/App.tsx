import React, {useEffect} from 'react';
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
  const questionSuggestionConst =
    [
        'Teach me something about histology',
        'How does the body fight off diseases?',
        'What are the different forms of genetic inheritance?',
        'Teach me about genetics', 'Teach me about proteins',
        'Teach me the circulatory system', 'Teach me the integumentary system',
        'Teach me the endocrine system'
    ];
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
  const [chatComponents, setChatComponents] = useState([<></>]);
  const [response, setResponse] = useState([]);
  const [simages, setImages] = useState([]);
  const [questionSuggestion, setQuestionSuggestion] = useState(questionSuggestionConst);
  const [messagesEnd, setMessagesEnd] = useState<HTMLDivElement | null>(null)


  function addToChat(component: any) {
      setChatComponents([...chatComponents, ...component])
        return component;
  }

  function handleSubmit(e: { preventDefault: () => void; target: any; }) {
      e.preventDefault();
      submitQuery();
  }
  function submitQuery(q: string = query) {
      setQuery('')
    // Prevent the browser from reloading the page

    // Read the form data
    //const form = e.target;
    //const formData = new FormData(form);
    console.log(JSON.stringify({q}));

    const component = addToChat(
        [<div className="self-end bg-red-50 py-4 px-6">
            <span>{q}</span>
        </div>]
    )
    //You can pass formData as a fetch body directly:
    fetch('http://localhost:8000/api/v0/query', {
      method: 'POST',
      body: JSON.stringify({query: q}),
      headers: {
        "Content-Type": "application/json"
      }
     }) //nEED TO HAVE IT so it changes based on response
          .then((res) => res.json())
          .then((json) => {
            console.log(json)
            json.suggestions && setQuestionSuggestion(json.suggestions)
            addToChat(
              [...component,
                  <div className="flex flex-col">
                <div>{json.message}</div>
                {json.images.map((image: string) => <img src = {image}/>)}
              </div>]);
          });
    // Or you can work with it as a plain object:
    //const formJson = Object.fromEntries(formData.entries());
    //console.log(formJson);

  }

    useEffect(() => {
        messagesEnd?.scrollIntoView({ behavior: "smooth" });
    }, [chatComponents])

  return (
    <div className="App flex items-center flex-col h-screen w-screen">
        <div className="flex flex-col items-center max-w-xl h-screen max-h-xl">
            <div className = "overflow-scroll flex flex-col items-center h-screen max-w-fit w-full bg-grey">
                {chatComponents}
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { setMessagesEnd(el); }}>
                </div>
            </div>
            <div className="relative mb-4 flex flex-col justify-center content-center py-8">
                <QuestionsButtons questionSuggestion={questionSuggestion} clickHandler={submitQuery}/>
                <form className="flex" onSubmit={handleSubmit}>
                    <input
                        type = 'text'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="queryBar shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <input type='submit' disabled={!query}/>
                </form>
            </div>
        </div>

      {/*<Slideshow images={images} />*/}

      {/*<div className = "justify-center grid grid-flow-row-dense grid-cols-3 grid-rows-3">
        <SuggestionBox></SuggestionBox>
        <QuestionsButtons questionSuggestion={questionSuggestion.questionSuggestion} />
        <button>Suggestion 1</button>
        <button>Suggestion 2</button>
        <button>Suggestion 3</button>
      </div>*/}
      {/*<div className = "response flex flex-wrap max-w-fit max-h-fit w-screen h-screen color:200">

      </div>*/}

    </div>


  )
}

export default App
