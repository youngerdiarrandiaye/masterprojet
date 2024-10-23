import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Patient, Visite} from "../model/patient.model";
import {forkJoin, Observable, of, throwError} from "rxjs";
import {DeclarationGrossesse, Status} from "../model/declarationGrossesse.model";
import {catchError, map, switchMap} from "rxjs/operators";
import {Commune, EtablissementDeSante, ProfessionnelDeSante} from "../model/region.model";

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

  getPatientById(patientId: number): Observable<Patient> {  // Assurez-vous que patientId est string ici
    return this.http.get<Patient>(`${this.apiUrl}/patients/${patientId}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération du patient', error);
        return throwError(error); // Propager l'erreur
      })
    );
  }
  getVisitesByPatientId(patientId: string): Observable<Visite[]> {
    const url = `${this.apiUrl}/visites?patientId=${patientId}`;
    console.log('Appel API:', url); // Log de l'URL
    return this.http.get<Visite[]>(url);
  }


  getDeclarationByCode(code: string): Observable<DeclarationGrossesse | null> {
    // Pas de trim ou de lowercase ici
    return this.http.get<DeclarationGrossesse[]>(`${this.apiUrl}/declarations?codeDeclarationGrossesse=${code}`)
      .pipe(
        map((declarations: DeclarationGrossesse[]) => {
          console.log('Déclarations récupérées:', declarations);
          return declarations.length > 0 ? declarations[0] : null;
        }),
        catchError((error) => {
          console.error('Erreur lors de la récupération de la déclaration :', error);
          return of(null); // Retourner null en cas d'erreur
        })
      );
  }

  getDeclarationById(id: number): Observable<DeclarationGrossesse[]> {
    return this.http.get<DeclarationGrossesse[]>(`${this.apiUrl}/declarations?id=${id}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de la déclaration :', error);
        return throwError(error);
      })
    );
  }

  updateDeclaration(declaration: DeclarationGrossesse): Observable<DeclarationGrossesse> {
    console.log('Mise à jour de la déclaration :', declaration); // Vérification des données avant l'appel API
    // Utiliser le query paramètre id pour la mise à jour
    return this.http.put<DeclarationGrossesse>(`${this.apiUrl}/declarations/${declaration.id}`, declaration).pipe(
      catchError((error) => {
        console.error('Erreur lors de la mise à jour de la déclaration :', error);
        return throwError(error);
      })
    );
  }

  // Calculer la date prévue d'accouchement
  calculerDatePrevueAccouchement(dateDernieresRegles: Date): Date {
    const dateAccouchement = new Date(dateDernieresRegles);
    dateAccouchement.setDate(dateAccouchement.getDate() + 280); // 280 jours = 40 semaines
    return dateAccouchement;
  }

  // Fonction pour planifier les visites prénatales
  planifierVisites(dateDernieresRegles: Date | string,patientId: number): Visite[] {
    // Conversion explicite en type Date si une chaîne est fournie
    const dateDDR = new Date(dateDernieresRegles);
    this.visites = []; // Réinitialiser les visites avant d'ajouter les nouvelles

    // Première visite prénatale (6e à 8e semaine)
    const datePremiereVisite = new Date(dateDDR);
    datePremiereVisite.setDate(datePremiereVisite.getDate() + 42); // 6 semaines après DDR
    this.visites.push({ type: "Première visite prénatale", date: datePremiereVisite,patientId });

    // Visites prénatales ultérieures
    const mois = [3, 5, 6, 7, 8, 9];
    mois.forEach((moisAdditionnel, index) => {
      const nouvelleDate = new Date(dateDDR);
      nouvelleDate.setMonth(nouvelleDate.getMonth() + moisAdditionnel);

      if (index === 0) {
        this.visites.push({ type: "Échographie de datation", date: nouvelleDate ,patientId});
      } else if (index === 2) {
        this.visites.push({ type: "Échographie morphologique", date: nouvelleDate ,patientId});
      } else if (index === 5) {
        this.visites.push({ type: "Échographie du 3ème trimestre", date: nouvelleDate,patientId });
      }
      this.visites.push({ type: `Consultation du mois ${index + 4}`, date: nouvelleDate,patientId });
    });

    // Rendez-vous anesthésiste (8e mois)
    const dateAnesthesiste = new Date(dateDDR);
    dateAnesthesiste.setMonth(dateAnesthesiste.getMonth() + 8);
    this.visites.push({ type: "Rendez-vous anesthésiste", date: dateAnesthesiste ,patientId});

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
