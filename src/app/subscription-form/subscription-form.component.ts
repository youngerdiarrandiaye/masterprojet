import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Formula, PaymentMode, Subscription, SubscriptionStatus} from "../model/subscription.model";
import {SubscriptionService} from "../services/subscription.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialogRef} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {catchError, debounceTime, map, switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css'
})
export class SubscriptionFormComponent implements OnInit{
  subscriptionForm: FormGroup;
  subscriptions: Subscription[] = [];
  emailAlreadyExists = false;
  dataSource = new MatTableDataSource<Subscription>(this.subscriptions);

  // Utiliser les valeurs de l'énumération Formula
  formulas = Object.values(Formula);

  // Ajout des modes de paiement et statuts de souscription
  paymentModes = Object.values(PaymentMode);
  subscriptionStatuses = Object.values(SubscriptionStatus);

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<SubscriptionFormComponent>
  ) {
    // Initialisation du formulaire réactif avec les nouveaux champs
    this.subscriptionForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // Exemple de format de téléphone
      email: ['', [Validators.required, Validators.email], [this.emailValidator()]], // Validation asynchrone pour l'email
      address: [''], // Optionnel
      dateOfBirth: ['', Validators.required],
      CNI: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]], // Carte d'identité
      formula: ['', Validators.required], // Formule sélectionnée
      startDate: ['', Validators.required], // Date de début de souscription
      duration: ['', Validators.required], // Durée (ex: '1 an')
      annualCeiling: ['', Validators.required], // Plafond annuel
      subscriptionFee: ['', Validators.required], // Montant de la prime
      status: [SubscriptionStatus.Pending, Validators.required], // Statut de la souscription
      paymentMode: ['', Validators.required], // Mode de paiement
      renewalDate: ['', Validators.required], // Date de renouvellement
      familyMembers: this.fb.array([]), // Initialisation de la liste des membres de famille
    });
  }

  // Validateur asynchrone pour l'email
  emailValidator() {
    return (control: AbstractControl): Observable<{ emailExists: boolean } | null> => {
      if (!control.value) {
        return of(null);
      }

      return this.subscriptionService.checkEmailExists(control.value).pipe(
        debounceTime(500), // Attendre 500ms pour éviter de faire trop d'appels API
        map((emailExists: boolean) => {
          return emailExists ? { emailExists: true } : null;
        }),
        catchError(() => of(null)) // En cas d'erreur, on retourne null pour ne pas bloquer la validation
      );
    };
  }

  markEmailAsTouched(): void {
    const emailControl = this.subscriptionForm.get('email');
    if (emailControl) {
      emailControl.markAsTouched();
    }
  }

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  // Accéder au tableau de membres de la famille
  get familyMembers(): FormArray {
    return this.subscriptionForm.get('familyMembers') as FormArray;
  }

  // Ajouter un membre de la famille
  addFamilyMember() {
    const memberGroup = this.fb.group({
      relation: ['', Validators.required], // Relation (ex: enfant, conjoint)
      fullName: ['', Validators.required], // Nom complet du membre
    });
    this.familyMembers.push(memberGroup);
  }

  // Supprimer un membre de la famille
  removeFamilyMember(index: number) {
    this.familyMembers.removeAt(index);
  }

  // Charger les souscriptions existantes
  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe((subscriptions: Subscription[]) => {
      this.subscriptions = subscriptions;
      this.dataSource.data = this.subscriptions;
    });
  }

  // Soumettre le formulaire de souscription
  onSubmit() {
    if (this.subscriptionForm.valid) {
      const subscriptionData: Subscription = this.subscriptionForm.value;

      this.subscriptionService.createSubscription(subscriptionData).subscribe(() => {
        this.snackBar.open('Souscription ajoutée avec succès', 'OK', { duration: 3000 });
        this.dialogRef.close(subscriptionData); // Fermer le dialogue et retourner les données
        this.loadSubscriptions(); // Recharger les souscriptions
      }, error => {
        this.snackBar.open('Erreur lors de l\'ajout de la souscription', 'OK', { duration: 3000 });
      });
    } else {
      this.subscriptionForm.markAllAsTouched(); // Marquer tous les champs comme touchés pour afficher les erreurs
      this.snackBar.open('Veuillez remplir tous les champs obligatoires', 'OK', { duration: 3000 });
    }
  }
}
