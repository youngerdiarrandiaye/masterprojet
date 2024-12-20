// models/patient.model.ts
export interface Patient {
  id?: number; // ID auto-généré par JSON Server
  nomComplet: string;
  dateNaissance: Date;
  sexe: 'Masculin' | 'Féminin';
  numeroTelephone: string;
  adresse: string;
}
export interface Visite {
  id?: number;
  type: string;
  date: Date;
  patientId: number;
}
