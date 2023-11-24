export interface IHistory {
  address: string;
  tags: { id: number; name: string }[];
  date?: string | null;
  department: string;
}
