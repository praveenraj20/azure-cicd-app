import { OwnerDetails } from "src/app/api/flexcub-api/models";

export interface IDomains {
  value: string;
  viewValue: string;
}

export interface IRoles {
  value: string;
  viewValue: string;
}

export interface IYears {
  value: number;
  viewValue: string;
}

export interface ILevels {
  value: string;
  viewValue: string;
}

export interface ITechnologies {
  value: string;
  viewValue: string;
}

export interface ICoreTechnology {
  technologyId: number;
  technologyValues: string;
  priority: number;
}

export interface IHiringPriority {
  label: string;
  value: string;
}


export interface IOwnerDetails extends OwnerDetails {
  editable?: boolean;
}
