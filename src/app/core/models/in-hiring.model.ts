export interface IInhiringStatus {
  title: string;
  description: number | string;
  count: any;
  id: number | string;
}

export interface IInhiring {
  _id: number | string;
  index: number;
  picture: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  clientCompany: string;
  status: string;
  contractStartDate: string;
  pointOfContact: string;
}

export interface INewdashboardStatus {
  title: string;
  count: any;
  id: number | string;
}
