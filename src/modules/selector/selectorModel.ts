export type Player = {
  name: string;
  physical: number;
  technical: number;
  tactical: number;
  isRecurring: boolean;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
