import {Feature} from "./Feature";
import {User} from "./User";

export interface Task {
  name: string;
  description: string;
  priority: string;
  feature: Feature;
  estimatedCompletionTime: number;
  status: 'todo' | 'doing' | 'done';
  dateAdded?: Date;
  startDate?: Date;
  endDate?: Date;
  responsibleUser: 'devops' | 'developer';
  user?: User;
}
