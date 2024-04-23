import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QuizStateContext } from "../App.jsx";
import "./Quiz.css";

function Quiz(props) {
  const { indexState, question, length } = props;
  const { currIndex, setCurrIndex } = indexState;

  const { quizState, setQuizState } = useContext(QuizStateContext);

  const navigate = useNavigate();

  const handleOptionClick = (selected) => {
    const selectedOption =
      selected === "A"
        ? question.optionA
        : selected === "B"
        ? question.optionB
        : selected === "C"
        ? question.optionC
        : selected === "D"
        ? question.optionD
        : null;

    handleQuizState(selectedOption, question);

    if (selectedOption === question.answer) alert("Correct Answer!");
    else alert("Wrong Answer!");

    handleNextQuestion();
  };

  const handleQuizState = (selectedOption, question) => {
    const isCorrect = selectedOption === question.answer;
    const updatedAttemptedQuestions = [...quizState];

    const existingAttempt = updatedAttemptedQuestions.find(
      (attempted) => attempted.question === question.question
    );

    if (existingAttempt) {
      existingAttempt.selectedOption = selectedOption;
    } else {
      updatedAttemptedQuestions.push({
        question: question.question,
        selectedOption,
        isCorrect,
      });
    }

    setQuizState(updatedAttemptedQuestions);
  };

  const handleNextQuestion = () => {
    const nextIndex = currIndex + 1;

    if (nextIndex === length) {
      navigate("/result");
    } else {
      setCurrIndex(nextIndex % length);
    }
  };

  const handlePreviousQuestion = () => {
    if (currIndex > 0) {
      setCurrIndex((currIndex - 1 + length) % length);
    }
  };

  return (
    <div id="quiz-container">
      <div id="quiz">
        <div id="sidebar"></div>
        <h2 id="quiz-question">Question</h2>
        <p id="quiz-num">
          <span>{currIndex + 1}</span> of <span>{length}</span>
        </p>
        <span id="curr-question">{question.question}</span>
        <div id="quiz-options">
          <div className="quiz-option" onClick={() => handleOptionClick("A")}>
            {question.optionA}
          </div>
          <div className="quiz-option" onClick={() => handleOptionClick("B")}>
            {question.optionB}
          </div>
          <div className="quiz-option" onClick={() => handleOptionClick("C")}>
            {question.optionC}
          </div>
          <div className="quiz-option" onClick={() => handleOptionClick("D")}>
            {question.optionD}
          </div>
        </div>
        <div id="quiz-controls">
          <button id="quiz-previous" onClick={handlePreviousQuestion}>
            Previous
          </button>
          <button id="quiz-next" onClick={handleNextQuestion}>
            Next
          </button>
          <button
            id="quiz-quit"
            onClick={() => {
              if (window.confirm("Are you sure you want to quit ?"))
                navigate("/");
              else console.log("Continue your quiz");
            }}
          >
            Quit
          </button>
          <Link to="/result" id="quiz-finish">
            Finish
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
