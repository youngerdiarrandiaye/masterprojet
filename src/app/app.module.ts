import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer, MatSidenavModule
} from "@angular/material/sidenav";
import {MatList, MatListItem, MatNavList} from "@angular/material/list";
import {ProfessionelDeSanteComponent} from "./professionel-de-sante/professionel-de-sante.component";
import {AgentAssuranceTemplateComponent} from "./agent-assurance-template/agent-assurance-template.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from "@angular/material/card";
import {MatDivider, MatDividerModule} from "@angular/material/divider";
import {MatCell, MatHeaderCell, MatTable, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PatientTemplateComponent} from "./patient-template/patient-template.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { RemboursementComponent } from './remboursement/remboursement.component';
import { FacturesComponent } from './factures/factures.component';
import { SouscriptionsComponent } from './souscriptions/souscriptions.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { HomeComponent } from './home/home.component';
import {MatBadge} from "@angular/material/badge";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import { UpdateSubscriptionDialogComponent } from './update-subscription-dialog/update-subscription-dialog.component';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { SubscriptionDetailsDialogComponent } from './subscription-details-dialog/subscription-details-dialog.component';
import { EspaceSouscripteurComponent } from './espace-souscripteur/espace-souscripteur.component';
import {BaseChartDirective} from "ng2-charts";
import {NgOptimizedImage} from "@angular/common";
import { EspaceMaterniteComponent } from './espace-maternite/espace-maternite.component';
import { HomeSouscripteurComponent } from './home-souscripteur/home-souscripteur.component';
import { DeclarationGrossesseComponent } from './declaration-grossesse/declaration-grossesse.component';
import { AjouterPatientComponent } from './ajouter-patient/ajouter-patient.component';
import {ToastrModule} from "ngx-toastr";
import { SearchResultComponentComponent } from './search-result-component/search-result-component.component';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {NgxPaginationModule} from "ngx-pagination";
import { VisitesdespatientComponent } from './visitesdespatient/visitesdespatient.component';


@NgModule({
  declarations: [
    AppComponent,
    AgentAssuranceTemplateComponent,
    PatientTemplateComponent,
    ProfessionelDeSanteComponent,
    DashboardComponent,
    RemboursementComponent,
    FacturesComponent,
    SouscriptionsComponent,
    StatistiquesComponent,
    HomeComponent,
    UpdateSubscriptionDialogComponent,
    SubscriptionFormComponent,
    SubscriptionDetailsDialogComponent,
    EspaceSouscripteurComponent,
    EspaceMaterniteComponent,
    HomeSouscripteurComponent,
    DeclarationGrossesseComponent,
    AjouterPatientComponent,
    SearchResultComponentComponent,
    VisitesdespatientComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatMenuTrigger,
        MatMenuModule,
        MatMenuItem,
        MatDrawerContainer,
        MatDrawer,
        MatNavList,
        MatListItem,
        MatDrawerContent,
        MatCardContent,
        MatCardModule,
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSort,
        MatFormFieldModule,
        MatInputModule,
        MatSortHeader,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatBadge,
        MatSelect,
        MatOption,
        MatList,
        MatDialogContent,
        FormsModule,
        MatDialogActions,
        MatDatepickerInput,
        MatDatepickerToggle,
        MatDatepickerModule,
        MatDialogClose,
        MatDialogModule,
        MatSelectModule,
        MatSnackBarModule,
        MatNativeDateModule,
        HttpClientModule,
        BaseChartDirective,
        NgOptimizedImage,
        MatSidenavContainer,
        MatSidenavModule,
        ToastrModule.forRoot(),
        MatProgressSpinner,
        MatCheckboxModule,
        NgxPaginationModule,



    ],
  providers: [
    provideAnimationsAsync(),
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
