export interface ICandidates {
  _id: string;
  index: number;
  guid: string;
  img: string;
  picture: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  currentBalance: string;
  altEmail: string;
  altPhone: string;
  position: string;
  clientCompany: string;
  status: string;
  contractStartDate: string;
  contractEndDate: string;
  pointOfContact: string;
  skillSet: ISkillset[];
  comments: IComment[];
  appliedDate: string;
}

export interface ISkillset {
  id: number;
  role: string;
  level: string;
  technology: string;
  domain: string;
}

export interface IComment {
  id: number;
  name: string;
  position: string;
  status: string;
}
