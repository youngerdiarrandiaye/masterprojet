import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

export interface Facture {
  invoiceNumber: string;
  patient: string;
  amount: number;
  date: string;
}

const FACTURES_DATA: Facture[] = [
  {invoiceNumber: 'INV001', patient: 'John Doe', amount: 1200.50, date: '2023-09-01'},
  {invoiceNumber: 'INV002', patient: 'Jane Smith', amount: 950.00, date: '2023-08-15'},
  {invoiceNumber: 'INV003', patient: 'Youssou Diarra', amount: 1800.00, date: '2023-09-10'}
];
@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrl: './factures.component.css'
})
export class FacturesComponent implements  OnInit{

  displayedColumns: string[] = ['invoiceNumber', 'patient', 'amount', 'date', 'actions'];
  dataSource = new MatTableDataSource(FACTURES_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewInvoice(element: Facture) {
    alert(`Détails de la facture: ${element.invoiceNumber}`);
  }

  downloadInvoice(element: Facture) {
    alert(`Téléchargement de la facture: ${element.invoiceNumber}`);
  }

}
