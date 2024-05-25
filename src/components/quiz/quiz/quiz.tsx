import {  useEffect, useRef, useState } from "react";
import { IQuiz } from "../../../types/quiz"
import { IAnswer } from "../../../types/answer";
import { IResult } from "../../../types/results";
import { Page } from "../../app/App";

interface IQuizProps {
  quiz?: IQuiz | null;
  navigate: (page: Page) => void;
}

const Quiz: React.FC<IQuizProps> = ({quiz, navigate}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>();
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(quiz ? quiz.questions.length * 60 : 0)
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!quiz) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCompleted(current => !current);
          return 0;
        }
        console.log(prevTime);
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz]);

  if (!quiz) {
    return <div>No quiz selected</div>;
  }

  const handleAnswerSelection = (answer: IAnswer) => {
    setSelectedAnswer(answer);
  }

  const handleAnswerSubmit = () => {
    if (selectedAnswer && quiz) {
      setAnswers([...answers, selectedAnswer]);
      setSelectedAnswer(null);
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCompleted(current => !current);
        console.log(completed);
      }
    }
  }

  return (
    <div>
      {
        !completed && (
          <div>
            <div className="flex flex-row justify-between mb-4">
              <h2 className="text-4xl font-bold">{quiz.name}</h2>
              <div>
                <p>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</p>
              </div>
            </div>
            <h3 className="text-2xl mb-3">Question {currentQuestionIndex + 1} of {quiz.questions.length}</h3>
            <p className="text-base mb-5">{quiz.questions[currentQuestionIndex].title}</p>
            <ul className="mb-4">
              {
                quiz.questions[currentQuestionIndex].options?.map((option, index) => {
                  return (
                    <li key={index} onClick={() => handleAnswerSelection(option)}>
                      <input 
                        type="checkbox" 
                        checked={selectedAnswer?.id === option.id}
                        ref={el => (checkboxRefs.current[index] = el)}
                      />
                      <span className="ml-3">{option.title}</span>
                    </li>
                  )
                })
              }
            </ul>
            <button
              className="bg-green-400 px-6 py-2 rounded-md text-white mr-4"
              onClick={handleAnswerSubmit}
            >
              Next
            </button>
            <button
              className="bg-orange-400 px-6 py-2 rounded-md text-white"
              onClick={() => navigate("main")}
            >Back to Quizes</button>
          </div>
        )
      }
      {
        completed && (
          <div>
            <h2 className="text-4xl mb-5">Results:</h2>
            <h3 className="mb-5">
              You answered {answers.filter(answer => answer.isCorrect).length} out of {quiz.questions.length} questions correctly
            </h3>
            <button 
              className="bg-orange-400 px-6 py-2 rounded-md text-white"
              onClick={() => navigate('main')}
            >Back to Quizes</button>
          </div>
        )
      }
    </div>
  )
}

export default Quiz;