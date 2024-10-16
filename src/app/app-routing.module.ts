import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FacturesComponent} from "./factures/factures.component";
import {RemboursementComponent} from "./remboursement/remboursement.component";
import {SouscriptionsComponent} from "./souscriptions/souscriptions.component";
import {StatistiquesComponent} from "./statistiques/statistiques.component";
import {HomeComponent} from "./home/home.component";
import {HomeSouscripteurComponent} from "./home-souscripteur/home-souscripteur.component";
import {AjouterPatientComponent} from "./ajouter-patient/ajouter-patient.component";
import {DeclarationGrossesseComponent} from "./declaration-grossesse/declaration-grossesse.component";

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"facture",component:FacturesComponent},
  {path:"remboursement",component:RemboursementComponent},
  {path:"subscriptions",component:SouscriptionsComponent},
  {path:"statistiques",component:StatistiquesComponent},
  {path:"home-souscripteur",component:HomeSouscripteurComponent},
  {path:"ajouter-patient",component:AjouterPatientComponent},
  {path:"declaration-grossesse",component:DeclarationGrossesseComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
