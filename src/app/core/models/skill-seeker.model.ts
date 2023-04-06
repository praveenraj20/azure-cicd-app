export interface Domains {
  value: string;
  viewValue: string;
}

export interface Roles {
  value: string;
  viewValue: string;
}

export interface Priority {
  value: string;
  name: string;
}

export interface Years {
  value: string;
  viewValue: string;
}

export interface ExpYear {
  value: string;
  viewValue: string;
}

export interface ExpMonth {
  value: string;
  viewValue: string;
}

export interface ProjectTitle {
  value: string;
  viewValue: string;
}

export interface RateCardTitle {
  value: string;
  viewValue: string;
}

export interface SkillId {
  value: string;
  viewValue: string;
}

export interface Clients {
  value: string;
  viewValue: string;
}

export interface Levels {
  value: string;
  viewValue: string;
}

export interface Technologies {
  value: string;
  viewValue: string;
}

export interface Statuses {
  value: string;
  viewValue: string;
}

export interface Travel {
  value: string;
  viewValue: string;
}

export interface InterviewStages {
  value: string;
  viewValue: string;
}

export interface Remote {
  value: string;
  viewValue: string;
}

export interface Locations {
  value: string;
  name: string;
}

export interface Locals {
  value: string;
  name: string;
  cities: Array<Zips>;
}

export interface Zips {
  value: string;
}

export interface HiringStatus {
  value: string;
  viewValue: string;
}

export interface IProject {
  _id: number | string;
  picture: string;
  name: string;
  department: string;
  status: string;
  contractStartDate: string;
  contractEndDate: string;
}
