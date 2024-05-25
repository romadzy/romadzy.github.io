import Delete from '../../../assets/delete.svg';
import Edit from '../../../assets/edit.svg';
import Start from '../../../assets/start.svg';

interface IQuizListItemProps {
  id: string;
  name: string;
  handleQuizSelection: (id: string) => void;
  handleQuizDeletion: (id: string) => void;
  handleQuizEdit: (id: string) => void;
}

const QuizListItem: React.FC<IQuizListItemProps> = (props: IQuizListItemProps) => {
 return (
  <div className="flex flex-col w-5/12 items-center p-10 border-2 rounded-md">
    <p>
      {props.name}
    </p>
    <div className='flex flex-row gap-x-3 mt-6'>
      <img 
        src={Start} 
        alt="Start Quiz" 
        className='w-5 h-5 cursor-pointer' 
        onClick={() => props.handleQuizSelection(props.id)}
      />
      <img 
        src={Edit} 
        alt="Edit Quiz" 
        className='w-5 h-5 cursor-pointer'
        onClick={() => props.handleQuizEdit(props.id)}
      />
      <img 
        src={Delete} 
        alt="Delete Quiz" 
        className='w-5 h-5 cursor-pointer'
        onClick={() => props.handleQuizDeletion(props.id)} 
      />
    </div>
  </div>
 )
}

export default QuizListItem;