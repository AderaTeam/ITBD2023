export interface IHistory {
  id: number;
  address: string;
  tags: { id: number; name: string }[];
  date?: string | null;
  department: string;
}
