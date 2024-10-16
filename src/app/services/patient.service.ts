import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Patient, Visite} from "../model/patient.model";
import {Observable} from "rxjs";
import {DeclarationGrossesse} from "../model/declarationGrossesse.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  visites: Visite[] = [];
  private apiUrl = 'http://localhost:3000'; // L'URL de votre JSON Server
  constructor(private http: HttpClient) {
    this.apiUrl = 'http://localhost:3000';
  }
  ajouterPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  }
  obtenirPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }
  ajouterDeclarationGrossesse(declaration: DeclarationGrossesse): Observable<DeclarationGrossesse> {
    return this.http.post<DeclarationGrossesse>(`${this.apiUrl}/declarations`, declaration);
  }

  // Obtenir la liste des déclarations de grossesse
  obtenirDeclarations(): Observable<DeclarationGrossesse[]> {
    return this.http.get<DeclarationGrossesse[]>(`${this.apiUrl}/declarations`);
  }

  // Calculer la date prévue d'accouchement
  calculerDatePrevueAccouchement(dateDernieresRegles: Date): Date {
    const dateAccouchement = new Date(dateDernieresRegles);
    dateAccouchement.setDate(dateAccouchement.getDate() + 280); // 280 jours = 40 semaines
    return dateAccouchement;
  }

  // Fonction pour planifier les visites prénatales
  planifierVisites(dateDernieresRegles: Date | string): Visite[] {
    // Conversion explicite en type Date si une chaîne est fournie
    const dateDDR = new Date(dateDernieresRegles);
    this.visites = []; // Réinitialiser les visites avant d'ajouter les nouvelles

    // Première visite prénatale (6e à 8e semaine)
    const datePremiereVisite = new Date(dateDDR);
    datePremiereVisite.setDate(datePremiereVisite.getDate() + 42); // 6 semaines après DDR
    this.visites.push({ type: "Première visite prénatale", date: datePremiereVisite });

    // Visites prénatales ultérieures
    const mois = [3, 5, 6, 7, 8, 9];
    mois.forEach((moisAdditionnel, index) => {
      const nouvelleDate = new Date(dateDDR);
      nouvelleDate.setMonth(nouvelleDate.getMonth() + moisAdditionnel);

      if (index === 0) {
        this.visites.push({ type: "Échographie de datation", date: nouvelleDate });
      } else if (index === 2) {
        this.visites.push({ type: "Échographie morphologique", date: nouvelleDate });
      } else if (index === 5) {
        this.visites.push({ type: "Échographie du 3ème trimestre", date: nouvelleDate });
      }
      this.visites.push({ type: `Consultation du mois ${index + 4}`, date: nouvelleDate });
    });

    // Rendez-vous anesthésiste (8e mois)
    const dateAnesthesiste = new Date(dateDDR);
    dateAnesthesiste.setMonth(dateAnesthesiste.getMonth() + 8);
    this.visites.push({ type: "Rendez-vous anesthésiste", date: dateAnesthesiste });

    // Enregistrer les visites dans JSON Server
    this.enregistrerVisites(this.visites);

    return this.visites;
  }

  enregistrerVisites(visites: Visite[]): void {
    // Boucler sur toutes les visites et les enregistrer une par une
    visites.forEach(visite => {
      this.http.post<Visite>(`${this.apiUrl}/visites`, visite)
        .subscribe({
          next: response => console.log('Visite enregistrée avec succès', response),
          error: err => console.error('Erreur lors de l\'enregistrement de la visite', err)
        });
    });
  }

}
