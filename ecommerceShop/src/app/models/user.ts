export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  created?: Date | string;
  phoneNumber?: string;
}
