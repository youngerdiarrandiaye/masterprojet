import { Component } from '@angular/core';
import {ChartData, ChartType} from "chart.js";

@Component({
  selector: 'app-espace-souscripteur',
  templateUrl: './espace-souscripteur.component.html',
  styleUrl: './espace-souscripteur.component.css'
})
export class EspaceSouscripteurComponent {
  // Déclaration du type de graphique (bar, line, etc.)
  public barChartType: ChartType = 'bar';

  patients = [
    { name: 'Patient 1', lastVisit: new Date(), nextVisit: new Date(new Date().setDate(new Date().getDate() + 30)) },
    { name: 'Patient 2', lastVisit: new Date(), nextVisit: new Date(new Date().setDate(new Date().getDate() + 60)) }
  ];

  factures = [
    { id: 1, amount: 150, status: 'Payée' },
    { id: 2, amount: 200, status: 'En attente' }
  ];

  // Données du graphique
  public barChartData: ChartData<'bar', number[], string> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [50, 100, 150, 200, 250, 300, 350],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

}
