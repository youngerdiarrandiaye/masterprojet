import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
export interface Remboursement {
  patient: string;
  montant: number;
  statut: string;
}

const REMBOURSEMENT_DATA: Remboursement[] = [
  {patient: 'Patient 1', montant: 1000, statut: 'En attente'},
  {patient: 'Patient 2', montant: 1500, statut: 'Approuvé'},
  {patient: 'Patient 3', montant: 2000, statut: 'Rejeté'},
  {patient: 'Patient 4', montant: 500, statut: 'En attente'},
];
@Component({
  selector: 'app-remboursement',
  templateUrl: './remboursement.component.html',
  styleUrl: './remboursement.component.css'
})
export class RemboursementComponent  implements OnInit{
  displayedColumns: string[] = ['patient', 'montant', 'statut', 'actions'];
  dataSource: any[] = []; // Replace with your actual data model
  filteredDataSource: any[] = []; // For filtered results
  enAttenteCount = 0; // Update these with real counts
  approuveCount = 0;
  rejeteCount = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    // Initialize dataSource with all reimbursements
    this.dataSource = this.fetchRemboursements(); // Your method to fetch data
    this.filteredDataSource = this.dataSource; // Start with all data
    this.updateCounts();
  }

  // Method to fetch data (placeholder)
  fetchRemboursements() {
    // Replace with your actual data-fetching logic
    return [
      { patient: 'John Doe', montant: 100, statut: 'En attente' },
      { patient: 'Jane Smith', montant: 200, statut: 'Approuvé' },
      { patient: 'Alice Johnson', montant: 150, statut: 'Rejeté' },
      // Add more data as needed
    ];
  }

  // Method to filter data based on status
  filterByStatus(status: string) {
    this.filteredDataSource = this.dataSource.filter(remboursement => remboursement.statut === status);
  }

  // Reset filter to show all reimbursements
  resetFilter() {
    this.filteredDataSource = this.dataSource;
  }

  // Apply search filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredDataSource = this.dataSource.filter(remboursement =>
      remboursement.patient.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  // Update counts based on current data
  updateCounts() {
    this.enAttenteCount = this.dataSource.filter(r => r.statut === 'En attente').length;
    this.approuveCount = this.dataSource.filter(r => r.statut === 'Approuvé').length;
    this.rejeteCount = this.dataSource.filter(r => r.statut === 'Rejeté').length;
  }

  // Additional methods for actions like voirDetails, approuver, rejeter...
  voirDetails(remboursement: any) {
    // Logic for viewing details
  }

  approuver(remboursement: any) {
    // Logic for approving
    remboursement.statut = 'Approuvé';
    this.updateCounts();
  }

  rejeter(remboursement: any) {
    // Logic for rejecting
    remboursement.statut = 'Rejeté';
    this.updateCounts();
  }

}
