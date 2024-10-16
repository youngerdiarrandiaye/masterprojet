import {Component, OnInit} from '@angular/core';
import {Patient} from "../model/patient.model";
import {PatientService} from "../services/patient.service";


@Component({
  selector: 'app-ajouter-patient',
  templateUrl: './ajouter-patient.component.html',
  styleUrl: './ajouter-patient.component.css'
})
export class AjouterPatientComponent implements OnInit{
  patient: Patient = {
    nomComplet: '',
    dateNaissance: new Date(),
    sexe: 'Féminin',
    numeroTelephone: '',
    adresse: ''
  };
  constructor(private patientService: PatientService) {}
  ngOnInit(): void {

  }
  ajouterPatient() {
    this.patientService.ajouterPatient(this.patient).subscribe(() => {
      console.log('Patient ajouté avec succès');
      // Réinitialiser le formulaire après l'ajout
      this.patient = {
        nomComplet: '',
        dateNaissance: new Date(),
        sexe: 'Féminin',
        numeroTelephone: '',
        adresse: ''
      };
    });
  }



}
