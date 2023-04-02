export function SuggestionBox(){
    
    return(
        <button></button>
    );
}


import React, { useState } from "react";


export interface Questions {
  title: string;
  id: number;
}
//'QuestionProps' interface defines a component prop object with one property: questionSuggestion.
//questionSuggestion is an array of Questions objects.
export interface QuestionProps {
  questionSuggestion: Questions[];
}
//This is a functional component in TypeScript with the name QuestionsButtons that takes in props of type QuestionProps. 
//The props consist of an array of objects called questionSuggestion.
//The block consists of a div element containing a JavaScript expression that maps over the questionSuggestion array and returns a button element for each object in the array.
export const QuestionsButtons: React.FC<QuestionProps> = ({ questionSuggestion }) => {
    const [refresh, setRefresh] = useState(false);


    const handleRefreshClickSug = () => {
        setRefresh(!refresh);
      };
  //Maps the Questions objects to buttons
  return (
    <div>
      {questionSuggestion.map((Questions) => (
        //Generates the button & refreshes on click
        <button key={Questions.id} onClick={handleRefreshClickSug} className="space-x-4">{Questions.title}</button>
      ))}
    </div>
  );
};

export default QuestionsButtons;
