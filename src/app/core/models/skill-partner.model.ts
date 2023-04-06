export interface ISkillPartner {
  id: string;
  partners: Array<Partner[]>;
}

export interface Partner {
  buisnessName?: string;
  phone?: string;
  email?: string;
  taxID?: string;
  address1?: string;
  address2?: string;
  state?: string;
  zipCode?: string;
  primaryFullName?: string;
  primaryEmail?: string;
  primaryPhone?: string;
  secondaryFullName?: string;
  secondaryEmail?: string;
  secondaryPhone?: string;
  joinDate?: Date;
  status?: boolean;
}
