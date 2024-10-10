import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FamilyMember, Formula, PaymentMode, Subscription, SubscriptionStatus} from "../model/subscription.model";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SubscriptionService} from "../services/subscription.service";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-add-family-member-dialog',
  templateUrl: './update-subscription-dialog.component.html',
  styleUrl: './update-subscription-dialog.component.css'
})
export class UpdateSubscriptionDialogComponent implements OnInit{
  subscriptions: Subscription[] = [];
  dataSource = new MatTableDataSource<Subscription>(this.subscriptions);
  formulas = Object.values(Formula); // Liste des formules disponibles
  subscriptionStatuses = Object.values(SubscriptionStatus); // Statuts possibles
  paymentModes = Object.values(PaymentMode); // Modes de paiement possibles
  subscriptionForm!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private subscriptionService: SubscriptionService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateSubscriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subscription // Injecter les données existantes
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire avec les données de la souscription existante
    this.subscriptionForm = this.fb.group({
      id: [this.data.id],
      fullName: [this.data.fullName, Validators.required],
      phone: [this.data.phone, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: [this.data.email, [Validators.required, Validators.email]],
      address: [this.data.address || ''], // Optionnel
      dateOfBirth: [this.data.dateOfBirth, Validators.required],
      CNI: [this.data.CNI || '',[Validators.required, Validators.pattern('^[0-9]{13}$')]], // Optionnel
      formula: [this.data.formula, Validators.required],
      startDate: [this.data.startDate, Validators.required],
      duration: [this.data.duration, Validators.required],
      annualCeiling: [this.data.annualCeiling, Validators.required],
      subscriptionFee: [this.data.subscriptionFee, Validators.required],
      status: [this.data.status, Validators.required],
      paymentMode: [this.data.paymentMode, Validators.required],
      renewalDate: [this.data.renewalDate, Validators.required],
      familyMembers: this.fb.array(this.data.familyMembers.map(member => this.createFamilyMemberGroup(member)))
    });
  }

  // Créer un groupe de formulaire pour un membre de la famille
  createFamilyMemberGroup(member: FamilyMember): FormGroup {
    return this.fb.group({
      relation: [member.relation, Validators.required],
      fullName: [member.fullName, Validators.required]
    });
  }

  // Accès au FormArray des membres de la famille
  get familyMembers(): FormArray {
    return this.subscriptionForm.get('familyMembers') as FormArray;
  }

  // Ajouter un membre de la famille
  addFamilyMember(): void {
    this.familyMembers.push(this.fb.group({
      relation: ['', Validators.required],
      fullName: ['', Validators.required]
    }));
  }

  // Supprimer un membre de la famille
  removeFamilyMember(index: number): void {
    this.familyMembers.removeAt(index);
  }
  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe((subscriptions: Subscription[]) => {
      this.subscriptions = subscriptions;
      this.dataSource.data = this.subscriptions; // Assigner les données à dataSource
    });
  }
  // Soumettre le formulaire modifié
  onSubmit(): void {
    if (this.subscriptionForm.valid) {
      const updatedSubscription: Subscription = this.subscriptionForm.value;
      console.log('Données modifiées:', updatedSubscription);
      // Appeler le service pour sauvegarder les données mises à jour
      this.subscriptionService.updateSubscription(updatedSubscription).subscribe(() => {
        this.snackBar.open('Souscription mise à jour avec succès', 'OK', { duration: 3000 });
        this.loadSubscriptions(); // Recharger la liste après mise à jour
      });
      this.dialogRef.close(updatedSubscription);
    }
  }

  // Annuler la modification et fermer le dialogue
  onCancel(): void {
    this.dialogRef.close();
  }
}
