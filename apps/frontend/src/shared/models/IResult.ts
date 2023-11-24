export interface IResult {
  id?: number;
  date?: string;
  text: string;
  address?: string;
  category: string;
  group: string;
  department?: string;
  tags?: string[];
}
