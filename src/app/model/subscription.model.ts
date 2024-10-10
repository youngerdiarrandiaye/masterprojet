// src/app/models/subscription.model.ts
export interface Subscription {
  id?: number;
  fullName: string; // Nom complet du souscripteur
  phone: string; // Numéro de téléphone
  email: string; // Email
  address?: string; // Adresse
  dateOfBirth: Date; // Date de naissance
  CNI?: string; // Numéro d'identification (carte d'identité ou passeport)
  formula: Formula; // Formule d'abonnement choisie (Bronze, Argent, Or)
  startDate: Date; // Date de début de la souscription
  duration: string; // Durée de la souscription (mensuelle, annuelle, etc.)
  annualCeiling: number; // Plafond annuel
  subscriptionFee: number; // Montant de la prime (coût de la souscription)
  status: SubscriptionStatus; // État de la souscription (Active, Suspendue, etc.)
  paymentMode: PaymentMode; // Mode de paiement
  renewalDate: Date; // Date de renouvellement
  familyMembers: FamilyMember[]; // Liste des membres de la famille
  //history: SubscriptionHistory[]; // Historique des consultations et paiements
}

export interface Payment {
  paymentDate: Date; // Date du paiement
  amount: number; // Montant payé
  method: PaymentMode; // Méthode de paiement (carte, virement, etc.)
  paymentStatus: PaymentStatus; // Statut du paiement (effectué, en attente, etc.)
}

// Statut de la souscription
export enum SubscriptionStatus {
  Active = 'Active',
  Suspended = 'Suspended',
  Terminated = 'Terminated',
  Pending = 'Pending'
}

// Mode de paiement
export enum PaymentMode {
  DirectDebit = 'Direct Debit',
  MobilePayment = 'Mobile Payment'
}
// Statut du paiement
export enum PaymentStatus {
  Completed = 'Completed',
  Pending = 'Pending',
  Failed = 'Failed'
}
export enum Formula {
  BRONZE = 'FORMULE 1 BRONZE (Plafond de 1 000 000F CFA par personne / 1 500 000F CFA par famille)',
  ARGENT = 'FORMULE 2 ARGENT (Plafond de 2 000 000F CFA par personne / 3 000 000F CFA par famille)',
  OR = 'FORMULE 3 OR (Plafond de 4 000 000F CFA par personne / 6 000 000F CFA par famille)',
}

export interface FamilyMember {
  relation: 'enfant' | 'conjoint'; // Exemple de type
  fullName: string;
}
