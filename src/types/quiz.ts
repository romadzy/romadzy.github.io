import { IQuestion } from "./question";

export interface IQuiz {
  id?: string;
  name: string;
  questions: IQuestion[];
}