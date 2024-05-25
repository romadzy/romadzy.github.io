import { useEffect, useState } from "react";
import { IQuiz } from "../../../types/quiz";
import { IQuestion } from "../../../types/question";
import { IAnswer } from "../../../types/answer";
import { Page } from "../../app/App";

import Back from '../../../assets/back.svg';

interface IQuizFormProps {
  quiz?: IQuiz | null;
  handleQuizSubmit: (quiz: IQuiz) => void;
  navigate: (page: Page) => void
}

export const QuizForm: React.FC<IQuizFormProps> = ({quiz, navigate, ...props}) => {
  const [name, setName] = useState<string>('');
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentAnswer, setCurrentAnswer] = useState<IAnswer>({id: 0, title: '', isCorrect: false});

  useEffect(() => {
    if (quiz) {
      setName(quiz.name);
      setQuestions(quiz.questions);
    }
  }, [])

  const resetForm = () => {
    setName('');
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestion('');
    setCurrentAnswer({title: '', isCorrect: false});
  }

  const handleAnswerChange = (prop: string, value: string | boolean) => {
    const updatedAnswer = {
      ...currentAnswer,
      [prop]: value
    }
    setCurrentAnswer(updatedAnswer);
  }

  const handleAnswerCreation = () => {
    const updatedAnswers = answers ? [...answers, currentAnswer] : [currentAnswer];
    setAnswers(updatedAnswers)
    setCurrentAnswer({id: answers.length + 1, title: '', isCorrect: false});
  }

  const handleQuestionCreation = () => {
    const newQuestion: IQuestion = {
      id: String(questions.length + 1),
      title: currentQuestion,
      options: answers,
    }
    const updatedQuestions = [...questions, newQuestion];

    setQuestions(updatedQuestions);
    setAnswers([]);
    setCurrentAnswer({title: '', isCorrect: false});
    setCurrentQuestion('');
  }
  
  const handleQuestionDeletion = (id: string) => {
    const filteredQuestions = questions.filter(question => question.id !== id);
    setQuestions(filteredQuestions);
  }

  const handleQuizSubmit = () => {
    if (!quiz) {
      const newQuiz: IQuiz = {
        name: name,
        questions: questions,
      }
      props.handleQuizSubmit(newQuiz)
    } else {
      quiz = {
        ...quiz,
        name: name,
        questions: questions
      }
      props.handleQuizSubmit(quiz);
    }

    resetForm();
    navigate('main');
  }

  return (
    <section className="w-full max-w-none h-full mx-auto p-6 bg-white rounded-md shadow-md">
      <img 
        src={Back} 
        alt="Arrow left"
        onClick={() => navigate("main")}
        className="w-5 h-5 mb-5 cursor-pointer"
      />
      <h2 className="text-xl font-bold mb-4">Fill in the form</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Enter quiz name:</label>
        <input 
          type="text" 
          id="name" 
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-2 border-grey-300 rounded-md focus:outline-none" 
        />
      </div>
      <div>
        {
          questions && questions.map(question => {
            return (
              <div key={question.id} className="flex justify-between">
                <span>{question.title}</span>
                <button 
                  onClick={() => handleQuestionDeletion(question.id)}
                  className="inline-flex items-center px-4 py-2 ml-5 border border-transparent text-sm font-medium rounded-md bg-rose-200 hover:bg-rose-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Delete
                </button>
              </div>
            )
          })
        }
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Type some questions:</h2>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Question title:</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-grey-300 rounded-md focus:outline-none" 
        />
      </div>
      <div className="mb-4 space-y-2">
        <div className="flex flex-row justify-between">
          <div className="w-full">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer:</label>
            <input 
              type="text" 
              id="answer" 
              name="answer" 
              value={currentAnswer.title} 
              onChange={(e) => handleAnswerChange('title', e.target.value)}
              className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-grey-300 rounded-md focus:outline-none" 
            />
          </div>
          {//Todo Scores
          /* <div className="w-1/4">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Enter a score for this answer:</label>
            <input 
              type="text" 
              id="answer" 
              name="answer" 
              value={currentAnswer.title} 
              onChange={(e) => handleAnswerChange('title', e.target.value)}
              className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-grey-300 rounded-md focus:outline-none" 
            />
          </div> */}
        </div>
        <input 
          type="checkbox" 
          id="correct" 
          name="correct" 
          checked={currentAnswer.isCorrect} 
          onChange={(e) => handleAnswerChange('isCorrect', e.target.checked)}
          className="mt-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded shadow-sm"
        />
        <label htmlFor="correct" className="ml-2 text-sm text-gray-700">Correct answer</label>
        <button 
          type="button"
          onClick={handleAnswerCreation}
          className="inline-flex items-center px-4 py-2 ml-5 border border-transparent text-sm font-medium rounded-md bg-emerald-200 hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
      <div>
        {answers && answers.map((answer, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="text-gray-700 mr-2">{answer.title}</span>
            {answer.isCorrect && <span className="text-green-600">Correct</span>}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-x-4">
        {
          answers.length !== 0 && currentAnswer && (
            <button 
              type="button"
              onClick={handleQuestionCreation}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-emerald-200 hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus-text-white"
            >
              Save question
            </button>
          )
        }
        {
          questions.length !== 0 && name && (
            <button 
              type="button"
              onClick={handleQuizSubmit}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-fuchsia-200 hover:bg-fuchsia-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:text-white"
            >
              Save quiz
            </button>
          )
        }
      </div>
    </section>
  )
}

export default QuizForm;