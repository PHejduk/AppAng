export interface User {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  permissions: 'admin' | 'devops' | 'developer';
}
