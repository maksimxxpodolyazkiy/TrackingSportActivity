export interface Activity {
  categoryId: string;
  date: { seconds: number; nanoseconds: number };
  name: string;
  repeats: number;
}
