import {Component, OnInit} from '@angular/core';
import {ProfessionnelDeSante} from "../model/region.model";
import {SearchServiceService} from "../services/search-service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-result-component',
  templateUrl: './search-result-component.component.html',
  styleUrl: './search-result-component.component.css'
})
export class SearchResultComponentComponent implements OnInit{
  professionnels: ProfessionnelDeSante[] = [];
  isLoading = false;
  nom: string = '';
  profession: string = '';
  commune: string = '';

  constructor(private route: ActivatedRoute, private searchService: SearchServiceService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.nom = params['nom'] || '';
      this.profession = params['profession'] || '';
      this.commune = params['commune'] || '';
      // Appelle la méthode de recherche même si un seul critère est présent
      this.onSearch();
    });
  }

  onSearch(): void {
    this.isLoading = true;
    // Rechercher les professionnels en utilisant tous les critères
    this.searchService.searchProfessionnels(this.nom, this.profession, this.commune).subscribe(
      (data: ProfessionnelDeSante[]) => {
        this.professionnels = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des données', error);
        this.isLoading = false;
      }
    );
  }
}
