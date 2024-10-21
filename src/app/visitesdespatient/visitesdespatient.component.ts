import {Component, OnInit} from '@angular/core';
import {DeclarationGrossesse, Status} from "../model/declarationGrossesse.model";
import {PatientService} from "../services/patient.service";
import {Patient} from "../model/patient.model";


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

  constructor(private declarationService: PatientService) {}
  ngOnInit(): void {
    this.loadDeclarations(); // Charger les déclarations au démarrage
  }

  loadDeclarations(): void {
    // Exemple d'une méthode pour charger les déclarations
    this.declarationService.obtenirDeclarations().subscribe(
      (data) => {
        this.declarations = data;
        // Valider la première déclaration si elle existe
        if (this.declarations.length > 0) {
          this.validerDeclaration(this.declarations[0]); // Valider la première déclaration
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des déclarations', error);
      }
    );
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
      // Appel à la méthode de création du service
      this.declarationService.updateDeclaration(declaration).subscribe(
        (response) => {
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

  // Passer à la consultation d'un patient déclaré
  passerAConsultation(declaration: DeclarationGrossesse) {
    // Ici tu rediriges vers la page de consultation du patient déclaré
    console.log('Passer à la consultation pour', declaration.patientId);
    // Exemple : router.navigate(['/consultation', declaration.patientId]);
  }


}
