export interface IResult {
  id?: number;
  date?: string | null;
  text: string;
  address?: string;
  category: string;
  group: string;
  department?: string;
  tags?: { id: number; name: string }[];
}
