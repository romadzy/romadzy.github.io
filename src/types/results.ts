import { IAnswer } from "./answer";
import { IQuiz } from "./quiz";

export interface IResult {
  id: string;
  quiz: IQuiz;
  answers: IAnswer[];
}