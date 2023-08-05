import {Project} from "./Project";

export interface Feature {
  name: string;
  description: string;
  priority: string;
  project: Project;
  owner: string;
  status: 'todo' | 'doing' | 'done';
}
