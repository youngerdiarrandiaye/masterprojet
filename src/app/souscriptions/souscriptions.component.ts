import {Component, OnInit, ViewChild, AfterViewInit, forwardRef, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateSubscriptionDialogComponent } from "../update-subscription-dialog/update-subscription-dialog.component";
import {Subscription, Formula, FamilyMember,} from '../model/subscription.model';
import {SubscriptionService} from "../services/subscription.service";
import {SubscriptionFormComponent} from "../subscription-form/subscription-form.component";
import {SubscriptionDetailsDialogComponent} from "../subscription-details-dialog/subscription-details-dialog.component";

@Component({
  selector: 'app-souscriptions',
  templateUrl: './souscriptions.component.html',
  styleUrls: ['./souscriptions.component.css'] , // Correction ici: 'styleUrls' et non 'styleUrl'
})
export class SouscriptionsComponent implements OnInit,AfterViewInit{
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['fullName', 'phone', 'status', 'actions'];
  dataSource = new MatTableDataSource<Subscription>(this.subscriptions);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  activeCount: number = 0;
  suspendueCount: number = 0;
  pendingCount: number = 0;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private subscriptionService: SubscriptionService,
  ) {}

  ngOnInit() {
    this.loadSubscriptions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Lier le paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe((subscriptions: Subscription[]) => {
      this.subscriptions = subscriptions;
      this.dataSource.data = this.subscriptions; // Assigner les données à dataSource
      this.updateCounts();
    });
  }

  updateCounts() {
    // Compter le nombre de souscriptions dans chaque statut
    this.activeCount = this.subscriptions.filter(sub => sub.status === 'Active').length;
    this.suspendueCount = this.subscriptions.filter(sub => sub.status === 'Suspended').length;
    this.pendingCount = this.subscriptions.filter(sub => sub.status === 'Pending').length;
  }
  // Filtrer les souscriptions par statut
  filterByStatus(status: string) {
    this.dataSource.data = this.subscriptions.filter(sub => sub.status === status);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // Réinitialiser le filtre pour afficher toutes les souscriptions
  resetFilter() {
    this.dataSource.data = this.subscriptions;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editSubscription(subscription: Subscription) {
    const dialogRef = this.dialog.open(UpdateSubscriptionDialogComponent, {
      width: '600px',
      data: { ...subscription }, // Passer les données de la souscription
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Vérifier si les données ont été modifiées et les traiter
        this.updateSubscription(result);
      }
    });
  }
  // Méthode pour mettre à jour la souscription
  updateSubscription(updatedSubscription: Subscription) {
    // Appel à un service pour mettre à jour la souscription (ex: SubscriptionService)
    this.subscriptionService.updateSubscription(updatedSubscription).subscribe(
      response => {
        // Gérer la réponse du service et actualiser l'interface utilisateur
        console.log('Souscription mise à jour avec succès', response);
        this.loadSubscriptions(); // Recharger la liste des souscriptions (si nécessaire)
      },
      error => {
        console.error('Erreur lors de la mise à jour de la souscription', error);
      }
    );
  }

  deleteSubscription(subscription: Subscription) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette souscription?')) {
      this.subscriptionService.deleteSubscription(subscription.id!).subscribe(() => {
        this.snackBar.open('Souscription supprimée', 'OK', { duration: 3000 });
        this.loadSubscriptions(); // Recharger la liste après suppression
      });
    }
  }

  openSubscriptionDialog(): void {
    const dialogRef = this.dialog.open(SubscriptionFormComponent, {
      width: '500px',
      height: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const subscriptionData = {
          ...result,
          familyMembers: result.familyMembers.map((member: FamilyMember) => ({
            relation: member.relation,
            fullName: member.fullName,
          })),
        };

      }
      this.loadSubscriptions();
    });
  }
  //Méthode pour ouvrir la boîte de dialogue des détails
  openDetailsDialog(subscription: Subscription): void {
    this.dialog.open(SubscriptionDetailsDialogComponent, {
      width: '600px',
      data: subscription
    });
  }
  getStatusIcon(status: string): string {
    switch (status) {
      case 'Active':
        return 'check_circle'; // Icône pour actif
      case 'Suspended':
        return 'pause'; // Icône pour suspendu
      case 'Terminated':
        return 'cancel'; // Icône pour résilié
      default:
        return 'info'; // Icône par défaut
    }
  }


}
