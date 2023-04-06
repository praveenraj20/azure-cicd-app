import { environment } from 'src/environments/environment';
import { Locations } from '../models';

export const DEFAULT_PIC = 'assets/images/profile-img.png';
export const DEFAULT_AVATAR = 'assets/images/avatar-default-skillowner.png';
export const ownerImgUrl = `${environment.apiPrefix}/resource-planning/api/v1/fileDownloadImage?id=`;
export const fileUrl2 = `${environment.apiPrefix}/resource-planning/api/v1/downloadResume?id=`;
export const ownerResumeUrl = `${environment.apiPrefix}/resource-planning/api/v1/downloadResume?id=`;
export const excelDocViewer = `https://docs.google.com/viewerng/viewer?url=${environment.apiPrefix}/resource-planning/v1/file-reading/downloadTemplate`;
export const fileUploadUrl = `${environment.apiPrefix}/resource-planning/v1/file-reading/uploadExcel?id=`;

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const phoneRegex = '^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$';
export const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
export const einRegex = /^\d{2}\-?\d{7}$/;
export const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export const urlSecureRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
export const passwordRegex ="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,40}$"
export const DATEFORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const MONTHFORMAT = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const states: Locations[] = [
  { value: 'AK', name: 'Alaska' },
  { value: 'TX', name: 'Texas' },
  { value: 'AL', name: 'Alabama' },
  { value: 'AR', name: 'Arkansas' },
  { value: 'AZ', name: 'Arizona' },
  { value: 'CA', name: 'California' },
  { value: 'CO', name: 'Colorado' },
  { value: 'CT', name: 'Connecticut' },
  { value: 'DC', name: 'DistrictofColumbia' },
  { value: 'DE', name: 'Delaware' },
  { value: 'FL', name: 'Florida' },
  { value: 'GA', name: 'Georgia' },
  { value: 'HI', name: 'Hawaii' },
  { value: 'IA', name: 'Iowa' },
  { value: 'ID', name: 'Idaho' },
  { value: 'IL', name: 'Illinois' },
  { value: 'IN', name: 'Indiana' },
  { value: 'KS', name: 'Kansas' },
  { value: 'KY', name: 'Kentucky' },
  { value: 'LA', name: 'Louisiana' },
  { value: 'MA', name: 'Massachusetts' },
  { value: 'MD', name: 'Maryland' },
  { value: 'ME', name: 'Maine' },
  { value: 'MI', name: 'Michigan' },
  { value: 'MN', name: 'Minnesota' },
  { value: 'MO', name: 'Missouri' },
  { value: 'MS', name: 'Mississippi' },
  { value: 'MT', name: 'Montana' },
  { value: 'NC', name: 'NorthCarolina' },
  { value: 'ND', name: 'NorthDakota' },
  { value: 'NE', name: 'Nebraska' },
  { value: 'NH', name: 'NewHampshire' },
  { value: 'NJ', name: 'NewJersey' },
  { value: 'NM', name: 'NewMexico' },
  { value: 'NV', name: 'Nevada' },
  { value: 'NY', name: 'NewYork' },
  { value: 'OH', name: 'Ohio' },
  { value: 'OK', name: 'Oklahoma' },
  { value: 'OR', name: 'Oregon' },
  { value: 'PA', name: 'Pennsylvania' },
  { value: 'RI', name: 'RhodeIsland' },
  { value: 'SC', name: 'SouthCarolina' },
  { value: 'SD', name: 'SouthDakota' },
  { value: 'TN', name: 'Tennessee' },
  { value: 'TX', name: 'Texas' },
  { value: 'UT', name: 'Utah' },
  { value: 'VA', name: 'Virginia' },
  { value: 'VT', name: 'Vermont' },
  { value: 'WA', name: 'Washington' },
  { value: 'WI', name: 'Wisconsin' },
  { value: 'WV', name: 'WestVirginia' },
  { value: 'WY', name: 'Wyoming' },
];
