import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SearchServiceService} from "../services/search-service.service";

@Component({
  selector: 'app-professionel-de-sante',
  templateUrl: './professionel-de-sante.component.html',
  styleUrl: './professionel-de-sante.component.css'
})
export class ProfessionelDeSanteComponent {
  nom: string = ''; // Champ pour le nom
  profession: string = ''; // Champ pour la profession
  commune: string = ''; // Champ pour la commune

  constructor(private router: Router) {}

  onSearch(): void {
    // Construire l'URL de navigation avec les paramètres de recherche
    this.router.navigate(['/search-results'], {
      queryParams: {
        nom: this.nom,
        profession: this.profession,
        commune: this.commune,
      },
    });
  }
}
