import QuizListItem from "../quiz-list-item/quizListItem";
import { IQuiz } from "../../../types/quiz"

interface IQuizListProps {
  quizes?: IQuiz[];
  handleQuizSelection: (id: string) => void;
  handleQuizDeletion: (id :string) => void;
  handleQuizEdit: (id: string) => void;
}

const QuizList: React.FC<IQuizListProps> = (props: IQuizListProps) => {
  return (
    <div className="flex flex-wrap justify-around gap-5 p-4 border-2 border-emerald-100 rounded-md">
      {
        props.quizes && props.quizes.map(quiz => {
          return <QuizListItem 
            key={quiz.id ?? ''} 
            name={quiz.name} 
            id={quiz.id ?? ''} 
            handleQuizSelection={props.handleQuizSelection}
            handleQuizDeletion={props.handleQuizDeletion}
            handleQuizEdit={props.handleQuizEdit}
          />
        })
      }
    </div>
  )
}

export default QuizList