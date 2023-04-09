import {Simulate} from "react-dom/test-utils";

export function SuggestionBox(){

    return(
        <button></button>
    );
}


import React, { useState } from "react";
import submit = Simulate.submit;


//'QuestionProps' interface defines a component prop object with one property: questionSuggestion.
//questionSuggestion is an array of Questions objects.
export interface QuestionProps {
  questionSuggestion: string[];
  clickHandler: Function;
}
//This is a functional component in TypeScript with the name QuestionsButtons that takes in props of type QuestionProps.
//The props consist of an array of objects called questionSuggestion.
//The block consists of a div element containing a JavaScript expression that maps over the questionSuggestion array and returns a button element for each object in the array.
export const QuestionsButtons: React.FC<QuestionProps> = ({ questionSuggestion, clickHandler }) => {
    const [refresh, setRefresh] = useState(false);


    const handleRefreshClickSug = () => {
        setRefresh(!refresh);
      };
  //Maps the Questions objects to buttons
  return (
    <div className="flex flex-wrap">
      {questionSuggestion.map((question) => (
        //Generates the button & refreshes on click
        <button onClick={() => {
            handleRefreshClickSug()
            clickHandler(question)
        }} className="px-4 py-3 mx-auto my-2 border-dashed border-black border-2 rounded-lg ">{question}</button>
      ))}
    </div>
  );
};

export default QuestionsButtons;
