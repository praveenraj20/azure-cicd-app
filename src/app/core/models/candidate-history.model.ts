export interface ICandidateHistory {
  _id: string;
  index: number;
  guid: string;
  isVerified: boolean;
  picture: string;
  age: number;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  position: string;
  clientCompany: string;
  status: string;
  address: string;
  comments: IComments[];
  appliedDate: string;
}

export interface IComments {
  id: number;
  name: string;
  position: string;
  status: string;
}
