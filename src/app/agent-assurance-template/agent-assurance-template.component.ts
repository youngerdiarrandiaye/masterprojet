import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-agent-assurance-template',
  templateUrl: './agent-assurance-template.component.html',
  styleUrl: './agent-assurance-template.component.css'
})
export class AgentAssuranceTemplateComponent implements OnInit{

  claimsData = [
    { patient: 'Patient A', amount: 1200, status: 'Validé' },
    { patient: 'Patient B', amount: 800, status: 'En attente' },
    // Ajoute d'autres données ici
  ];

  recentSheets = [
    { patient: 'Patient 1', amount: 1000, status: 'Validé' },
    { patient: 'Patient 2', amount: 1500, status: 'En attente' },
    // Continue avec les autres feuilles de soins
  ];

  totalReimbursed = 25000; // Montant total remboursé ce mois-ci
  ongoingClaimsCount = 3;   // Nombre de demandes en cours
  validatedClaimsCount = 7;

  ngOnInit(): void {
  }  // Nombre de demandes validées

}
