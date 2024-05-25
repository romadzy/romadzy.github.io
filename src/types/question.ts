import { IAnswer } from "./answer";

export interface IQuestion {
  id: string;
  title: string;
  options?: IAnswer[];
  score?: number
}