import {Component, OnInit} from '@angular/core';
import {DeclarationGrossesse, Status} from "../model/declarationGrossesse.model";
import {PatientService} from "../services/patient.service";
import {Patient} from "../model/patient.model";
import {NotificationService} from "../services/notification.service";
import {Route, Router} from "@angular/router";


@Component({
  selector: 'app-visitesdespatient',
  templateUrl: './visitesdespatient.component.html',
  styleUrl: './visitesdespatient.component.css'
})
export class VisitesdespatientComponent implements OnInit{
  searchCode: string = ''; // Stocker le code de recherche
  declarations: DeclarationGrossesse[] = [];// Liste des déclarations
  declaration: DeclarationGrossesse | null = null; // Déclaration trouvée
  searchAttempted: boolean = false; // Indiquer si la recherche a été faite
  patient: Patient | null = null;

  constructor(private declarationService: PatientService,private notifyService : NotificationService,private route:Router) {}
  ngOnInit(): void {
  }


  notifinfo(){
    this.notifyService.showInfo("La date présumée de l’accouchement peut être également estimée en comptant 9 mois plus 7 à 14 jours après le premier jour des dernières règles.", "Estimation de la date présumée de l’accouchement")
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Déclaration valider avec succès!!", "Merci")
  }
  showToasterRejet(){
    this.notifyService.showWarning("Déclaration Rejeter avec succès!!", "Merci")
  }
  // Rechercher une déclaration par code
  rechercherDeclaration() {
    console.log('Code de recherche:', this.searchCode); // Vérifie la valeur de searchCode
    this.searchAttempted = true;

    if (this.searchCode) {
      this.declarationService.getDeclarationByCode(this.searchCode).subscribe(
        (declaration: DeclarationGrossesse | null) => {
          if (declaration) {
            this.declaration = declaration;
            this.declarationService.getPatientById(declaration.patientId).subscribe(
              (patient) => {
                this.patient = patient;
                console.log('Informations du patient récupérées:', patient);
              },
              (error) => {
                console.error('Erreur lors de la récupération des infos patient', error);
              }
            );
          } else {
            console.warn('Aucune déclaration trouvée avec ce code.');
            this.declaration = null;
          }
        },
        (error) => {
          console.error('Erreur lors de la recherche', error);
          this.declaration = null;
        }
      );
    } else {
      this.declaration = null; // Réinitialiser si le code de recherche est vide
    }
  }
  // Valider une déclaration
  validerDeclaration(declaration: DeclarationGrossesse) {
    if (declaration) {
      declaration.status = Status.Validee; // Mettre à jour le statut
      if (declaration.status = Status.Validee)
      this.showToasterSuccess();
      // Appel à la méthode de création du service
      this.declarationService.updateDeclaration(declaration).subscribe(
        (response) => {
          declaration.status = Status.Validee;
          console.log('Déclaration créée avec succès', response);
          // Actions supplémentaires après la création
        },
        (error) => {
          console.error('Erreur lors de la création de la déclaration', error);
        }
      );
    } else {
      console.warn('Aucune déclaration fournie pour validation.');
    }
  }

  // Rejetee une déclaration
  RejeterDeclaration(declaration: DeclarationGrossesse) {
    if (declaration) {
      declaration.status = Status.Rejetee; // Mettre à jour le statut
      // Appel à la méthode de création du service
      this.declarationService.updateDeclaration(declaration).subscribe(
        (response) => {
          this.showToasterRejet();
          console.log('Déclaration Rejetee', response);
          // Actions supplémentaires après la création
        },
        (error) => {
          console.error('Erreur lors de la création de la déclaration', error);
        }
      );
    } else {
      console.warn('Aucune déclaration fournie pour validation.');
    }
  }

  // Passer à la consultation d'un patient déclaré
  passerAConsultation(declaration: DeclarationGrossesse) {
    this.route.navigate(['/passer-consultation', declaration.patientId]);

  }


  protected readonly Status = Status;
}
