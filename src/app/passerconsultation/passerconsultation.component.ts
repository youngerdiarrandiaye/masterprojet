import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PatientService} from "../services/patient.service";
import {DeclarationGrossesse} from "../model/declarationGrossesse.model";
import {Visite} from "../model/patient.model";
import {ProfessionnelDeSante} from "../model/region.model";

@Component({
  selector: 'app-passerconsultation',
  templateUrl: './passerconsultation.component.html',
  styleUrl: './passerconsultation.component.css'
})
export class PasserconsultationComponent implements OnInit{
  patientId: string  | null = null;
  visites: Visite[] = [];// Liste des visites
  isLoading = false;
  constructor(private route: ActivatedRoute,private patientservice:PatientService) {
  }
  ngOnInit(): void {
    // Récupérer l'ID du patient depuis les paramètres de la route
    const idParam = this.route.snapshot.paramMap.get('id');
    this.onSearch();
    if (idParam) {
      this.patientId = idParam;  // Garde l'ID en tant que string
      console.log('ID du patient:', this.patientId);
      // Effectuer la recherche des visites si l'ID est valide
      this.onSearch();
    } else {
      console.error('Erreur: Aucun ID du patient trouvé dans la route.');
    }
  }
  onSearch(): void {
    this.isLoading = true;
    // Vérification que l'ID est bien défini et non vide
    if (this.patientId && this.patientId !== '') {
      this.patientservice.getVisitesByPatientId(this.patientId).subscribe(
        (data: Visite[]) => {
          // Filtre basé sur l'ID du patient
          this.visites = data;
          this.isLoading = false;
        },
        (error) => {
          console.error('Erreur lors de la récupération des visites', error);
          this.isLoading = false;
        }
      );
    } else {
      console.error('ID du patient non valide');
      this.isLoading = false;
    }
  }

  passerAConsultation(visite: Visite) {

  }
}

