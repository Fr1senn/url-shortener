import { User } from './user';

export type Url = {
  id: number;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  createdBy: User;
};
