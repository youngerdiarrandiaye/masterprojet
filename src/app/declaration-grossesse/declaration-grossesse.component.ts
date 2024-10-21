import {Component, OnInit} from '@angular/core';
import {Patient, Visite} from "../model/patient.model";
import {PatientService} from "../services/patient.service";
import {DeclarationGrossesse, Status} from "../model/declarationGrossesse.model";


@Component({
  selector: 'app-declaration-grossesse',
  templateUrl: './declaration-grossesse.component.html',
  styleUrl: './declaration-grossesse.component.css'
})
export class DeclarationGrossesseComponent implements OnInit{
  patients: Patient[] = [];
  patientId: number | null = null;
  dateDernieresRegles: Date | null = null; // Déclaration de la variable
  visites: Visite[] = [];
  declarations: DeclarationGrossesse[] = [];

  constructor(private patientService: PatientService) {
    this.patientService.obtenirDeclarations().subscribe((declarations) => {
      this.declarations = declarations;
    });
  }

  ngOnInit() {
    this.patientService.obtenirPatients().subscribe(patients => {
      this.patients = patients;
      // Pas besoin de planifier les visites ici, cela se fait lors de la déclaration
    });
  }

  faireDeclarationGrossesse() {
    // Vérifiez que patientId et dateDernieresRegles ne sont pas nulls
    if (this.patientId !== null && this.dateDernieresRegles) {
      const datePrevueAccouchement = this.patientService.calculerDatePrevueAccouchement(this.dateDernieresRegles);
      const selectedPatient = this.getPatientById(this.patientId);
      console.log('##############################',selectedPatient);
      console.log('selectedPatient ##############################',this.patientId);
      if (selectedPatient) {
        const code = this.generateCodeDeclarationGrossesse(selectedPatient.nomComplet);
        const nouvelleDeclaration: DeclarationGrossesse = {
          id: 0,  // JSON Server générera l'ID automatiquement
          patientId: this.patientId,
          dateDernieresRegles: this.dateDernieresRegles,
          datePrevueAccouchement: datePrevueAccouchement,
          codeDeclarationGrossesse: code,
          status: Status.EnAttente
        };

        this.patientService.ajouterDeclarationGrossesse(nouvelleDeclaration).subscribe(
          () => {
            console.log('Déclaration ajoutée avec succès');
            // Vérifiez que dateDernieresRegles n'est pas null avant de l'utiliser
            if (this.dateDernieresRegles) {
              this.visites = this.patientService.planifierVisites(this.dateDernieresRegles);
              console.log(this.visites); // Affiche les visites dans la console
            }
            // Réinitialiser les champs après l'ajout
            this.patientId = null;
            this.dateDernieresRegles = null;
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la déclaration :', error);
          }
        );
      } else {
        console.error('Patient introuvable pour l\'ID fourni:', this.patientId);
      }
    } else {
      console.error('Patient ID ou date des dernières règles manquants');
    }
  }


  generateCodeDeclarationGrossesse(nomComplet: string): string {
    let code = '';
    let isUnique = false;
    while (!isUnique) {
      // Générer un nouveau code
      const randomNumber = Math.floor(1000 + Math.random() * 9000); // Génère un nombre aléatoire à 4 chiffres
      const cleanNomComplet = nomComplet.replace(/\s+/g, '').toUpperCase(); // Enlever les espaces et mettre en majuscule
      code = `${cleanNomComplet}${randomNumber}`;
      // Vérifier si ce code existe déjà dans les déclarations
      isUnique = !this.declarations.some(declaration => declaration.codeDeclarationGrossesse === code);
    }
    return code;
  }
  // Récupérer le patient à partir de son ID
  getPatientById(id: number): Patient | undefined {
    return this.patients.find(patient => patient.id === id);
  }



}
