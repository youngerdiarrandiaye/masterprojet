import {Component, OnInit} from '@angular/core';
import {Patient, Visite} from "../model/patient.model";
import {PatientService} from "../services/patient.service";
import {DeclarationGrossesse} from "../model/declarationGrossesse.model";

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

  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.patientService.obtenirPatients().subscribe(patients => {
      this.patients = patients;
      // Pas besoin de planifier les visites ici, cela se fait lors de la déclaration
    });
  }

  faireDeclarationGrossesse() {
    if (this.patientId !== null && this.dateDernieresRegles) {
      const datePrevueAccouchement = this.patientService.calculerDatePrevueAccouchement(this.dateDernieresRegles);

      const nouvelleDeclaration: DeclarationGrossesse = {
        id: 0,  // JSON Server générera l'ID automatiquement
        patientId: this.patientId,
        dateDernieresRegles: this.dateDernieresRegles,
        datePrevueAccouchement: datePrevueAccouchement
      };

      this.patientService.ajouterDeclarationGrossesse(nouvelleDeclaration).subscribe(() => {
        console.log('Déclaration ajoutée avec succès');
        // Vérifier si dateDernieresRegles n'est pas null avant de l'utiliser
        if (this.dateDernieresRegles) {
          this.visites = this.patientService.planifierVisites(this.dateDernieresRegles);
          console.log(this.visites); // Affiche les visites dans la console
        }
        // Réinitialiser les champs après l'ajout
        this.patientId = null;
        this.dateDernieresRegles = null;
      });
    }
  }


}
