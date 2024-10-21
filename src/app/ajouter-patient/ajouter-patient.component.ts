import {Component, OnInit} from '@angular/core';
import {Patient} from "../model/patient.model";
import {PatientService} from "../services/patient.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../services/notification.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-ajouter-patient',
  templateUrl: './ajouter-patient.component.html',
  styleUrl: './ajouter-patient.component.css'
})
export class AjouterPatientComponent implements OnInit{
  patientForm: FormGroup;
  title = 'toaster-not';

  constructor(private fb: FormBuilder, private patientService: PatientService,private notifyService : NotificationService,private router: Router) {
    // Initialiser le formulaire
    this.patientForm = this.fb.group({
      nomComplet: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      sexe: ['Féminin', Validators.required],
      numeroTelephone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // Exemple de format de téléphone
      adresse: ['']
    });
  }

  ngOnInit(): void {}


  showToasterSuccess(){
    this.notifyService.showSuccess("Données enregistrées avec succès!!", "Merci")
  }

  ajouterPatient() {
    if (this.patientForm.valid) {
      const patient: Patient = this.patientForm.value; // Obtenir les données du formulaire
      // Simuler un délai de 2 secondes avant de masquer le spinner
      setTimeout(() => {
        this.patientService.ajouterPatient(patient).subscribe(() => {
          console.log('Patient ajouté avec succès');
          // Réinitialiser le formulaire après l'ajout
          this.patientForm.reset({
            nomComplet: '',
            dateNaissance: new Date(),
            sexe: 'Féminin',
            numeroTelephone: '',
            adresse: ''
          });
          this.router.navigate(['/home-souscripteur']); // Redirection après ajout
        }, (error) => {
          console.error('Erreur lors de l\'ajout du patient', error);
        });
      }, 2000); // 2000 millisecondes = 2 secondes
    }
  }


}
