import { StatementOfWorkGetDetails } from "src/app/api/flexcub-api/models";

export interface IStatementOfWorkGetDetails extends StatementOfWorkGetDetails {
    image?: string;
    skillSeekerProjectName?:string;
}