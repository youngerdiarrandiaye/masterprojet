export interface Region {
  id: number; // ID unique pour JSON Server
  nom: string;
  codeRegion: string;
  departements: Departement[]; // Liste des départements
}
export interface Departement {
  id: number; // ID unique pour JSON Server
  nom: string;
  codeDepartement: string;
  regionId: number; // Référence à l'ID de la région
  communes: Commune[]; // Liste des communes
}
export interface Commune {
  id: number; // ID unique pour JSON Server
  nom: string;
  codeCommune: string;
  departementId: number; // Référence à l'ID du département
  etablissements: EtablissementDeSante[]; // Liste des établissements de santé
}

export interface EtablissementDeSante {
  id: number; // ID unique pour JSON Server
  nom: string;
  type: TypeEtablissement; // Enum Type d'établissement
  adresse: string;
  codeEtablissement: string;
  communeId: number; // ID de la commune à laquelle l'établissement appartient
  professionnels: ProfessionnelDeSante[]; // Liste des professionnels de santé
}

export interface ProfessionnelDeSante {
  id: number; // ID unique pour JSON Server
  nom: string;
  prenom: string;
  profession: Profession; // Enum Profession
  numeroTel: string;
  etablissementId: number; // Ajout de l'ID de l'établissement
  etablissementNom?: string;
  communeNom?: string;
}

export enum TypeEtablissement {
  HOPITAL = 'Hôpital',
  CLINIQUE = 'Clinique',
  CENTRE_DE_SANTE = 'Centre de santé'
}
export enum Profession {
  MSAGE_FEMME = 'Sage-femme',
  GYNECOLOGUE_OBSTETRICIEN = 'Gynécologue Obstétricien',
  PEDIATRE = 'Pédiatre',
  ANESTHESISTE = 'Anesthésiste',
  INFIRMIER = 'Infirmier',
  KINESITHERAPEUTE = 'Kinésithérapeute',
  AIDE_SOIGNANT = 'Aide-Soignant',
  RADIOLOGUE = 'Radiologue'
}

