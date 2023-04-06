export interface IJobdesc {
  _id: string;
  index: number;
  jobId: string;
  position: string;
  clientCompany: string;
  bilingRate: string;
  hiringPosted: string;
  hiringClosed: string;
  email: string;
  phone: string;
  contractStartDate: string;
  contractEndDate: string;
  status: string;
  highlights: IHighlight[];
  jobBrief: string;
  responsibilities: IResponsibility[];
  requirements: IRequirement[];
}

export interface IHighlight {
  id: number;
  highlight: string;
}

export interface IResponsibility {
  id: number;
  responsibility: string;
}

export interface IRequirement {
  projectid: number;
  requirement: string;
  jobtitle: string;
  position: string | number;
  status: string;
}
export interface IHiring {
  projectid: number;
  requirement: string;
  jobtitle: string;
  position: string | number;
  status: string;
  requirementstatus: string;
  startdate: string;
}
