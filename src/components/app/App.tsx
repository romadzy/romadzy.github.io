import React, { useEffect } from 'react';
import { useState } from 'react';
import QuizList from '../quiz/quiz-list/quizList';
import QuizForm from '../quiz/quiz-form/quizForm';
import Quiz from '../quiz/quiz/quiz';
import { getQuizes, deleteQuiz, postQuiz, updateQuiz } from '../../service/quizService';

import './App.css';
import { IQuiz } from '../../types/quiz';
import { IResult } from '../../types/results';

// For simple routing
export type Page = 'main' | 'add' | 'quiz'

function App() {
  const [quizes, setQuizes] = useState<IQuiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<IQuiz | null>();
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuizes = async () => {
      setLoading(current => !current);
      const quizes = await getQuizes();
      setQuizes(quizes);
      setLoading(current => !current);
    }

    fetchQuizes();
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
  }
  
  const handleQuizSelection = (id: string) => {
    const selectedQuiz = quizes?.find(element => element.id === id);
    setCurrentPage('quiz');
    setSelectedQuiz(selectedQuiz);
  }

  const handleQuizDeletion = (id: string) => {
    console.log(id);
    const updatedQuizes = quizes?.filter(quiz => quiz.id !== id);
    setQuizes(updatedQuizes);
    updatedQuizes ? deleteQuiz(id) : deleteQuiz('');
  }

  const handleQuizSubmit = (quiz: IQuiz) => {
    // If quiz with such an id doesn't exist we creating a new one. I know here could be better solution)
    if (!quiz.id) {
      quiz.id = String(quizes.length + 1);
      const updatedQuizes = quizes ? [...quizes, quiz] : [quiz];
      setQuizes(updatedQuizes);
      postQuiz(quiz);
    } else {
      const oldQuizIndex = quizes.findIndex(oldQuiz => oldQuiz.id === quiz.id);
      if (oldQuizIndex !== -1) {
        const updatedQuizes = quizes.map(q => 
          q.id === quiz.id ? { ...q, name: quiz.name, questions: quiz.questions } : q
        );
        setQuizes(updatedQuizes);
        updateQuiz(quiz, quiz.id);
      }
    }
  }

  const handleQuizEdit = (id: string) => {
    const quiz = quizes?.find(quiz => quiz.id === id);
    setSelectedQuiz(quiz);
    navigate('add')
  }

  const handleQuizCompletion = (result: IResult) => {

  }

  const filteredQuizes = quizes.filter(quiz => 
    quiz.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='h-screen p-10'>
      <div className='container flex flex-col p-10 mx-auto h-full max-w-6xl bg-white shadow-md rounded-md overflow-y-auto'>
        {
          currentPage === 'add' && <QuizForm handleQuizSubmit={handleQuizSubmit} navigate={navigate} quiz={selectedQuiz}/>
        }
        {
          currentPage === 'quiz' && <Quiz quiz={selectedQuiz} navigate={navigate}/>
        }
        {
          currentPage === 'main' && (
            <div>
              <div className='flex flex-row justify-between items-center mb-4'>
                <div className='flex flex-col gap-y-1'>
                  <label htmlFor="search">Search by name</label>
                  <input 
                    type="text" 
                    name="search"
                    className='p-1 border-2 rounded focus:outline-none'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button
                  className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md bg-emerald-200 hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    navigate('add')
                    setSelectedQuiz(null)
                  }}
                >
                  Create quiz
                </button>
              </div>
              <QuizList 
                quizes={filteredQuizes} 
                handleQuizSelection={handleQuizSelection}
                handleQuizDeletion={handleQuizDeletion}
                handleQuizEdit={handleQuizEdit}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
