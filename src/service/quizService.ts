import { IQuiz } from "../types/quiz";

const requestDelay = <T>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

export const getQuizes = (): Promise<IQuiz[]> => {
  const storedQuizes = localStorage.getItem('quizes');
  const quizes = storedQuizes ? JSON.parse(storedQuizes) : [];

  return requestDelay(quizes);
}

export const postQuiz = (quiz: IQuiz): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const quizes = getQuizesSync();
      const updatedQuizes = [...quizes, quiz];

      localStorage.setItem('quizes', JSON.stringify(updatedQuizes));
      resolve()
    }, 1000)
  });
}

export const updateQuiz = (quiz: IQuiz, id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const quizes = getQuizesSync();
      const oldQuizIndex = quizes.findIndex(q => q.id === id);
      
      quizes[oldQuizIndex] = {
        ...quizes[oldQuizIndex],
        name: quiz.name,
        questions: quiz.questions
      }

      localStorage.setItem('quizes', JSON.stringify(quizes));
      resolve();
    }, 1000);
  });
}

export const deleteQuiz = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const quizes = getQuizesSync();
      const updatedQuizes = quizes.filter(quiz => quiz.id !== id);
      localStorage.setItem('quizes', JSON.stringify(updatedQuizes));
      resolve();
    }, 1000);
  });
}

const getQuizesSync = (): IQuiz[] => {
  const storedQuizes = localStorage.getItem('quizes');
  return storedQuizes ? JSON.parse(storedQuizes) : [];
}