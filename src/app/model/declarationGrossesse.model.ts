export interface DeclarationGrossesse {
  id?: number;
  patientId: number;
  dateDernieresRegles: Date;
  datePrevueAccouchement: Date;
  codeDeclarationGrossesse: string;
  status:Status;
}
export enum Status {
  EnAttente = 'en attente',
  Validee = 'validée',
  Rejetee = 'rejetée'
}
