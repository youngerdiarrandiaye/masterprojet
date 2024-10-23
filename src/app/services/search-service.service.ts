import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, Observable, of} from "rxjs";
import {Commune, EtablissementDeSante, ProfessionnelDeSante, Region} from "../model/region.model";
import {catchError, map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
  private apiUrl = 'http://localhost:3000'; // Remplacez par l'URL de votre JSON Server

  constructor(private http: HttpClient) {}

  searchCommuneByName(nomCommune: string): Observable<Commune[]> {
    if (!nomCommune) {
      return of([]); // Retourne un tableau vide si le nom est vide
    }
    return this.http.get<Commune[]>(`${this.apiUrl}/communes?nom=${nomCommune}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des communes', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  searchProfessionnels(nom?: string, profession?: string, communeNom?: string): Observable<ProfessionnelDeSante[]> {
    let params: any = {};
    // Récupérer toutes les communes et établissements
    return forkJoin([
      this.http.get<Commune[]>(`${this.apiUrl}/communes`),
      this.http.get<EtablissementDeSante[]>(`${this.apiUrl}/etablissements`)
    ]).pipe(
      switchMap(([communes, etablissements]) => {
        // Créer un mappage pour les communes
        const communeMap = new Map<number, string>();
        communes.forEach(c => communeMap.set(c.id, c.nom?.toLowerCase() || ''));

        // Préparation des professionnels
        return this.http.get<ProfessionnelDeSante[]>(`${this.apiUrl}/professionnels`, { params }).pipe(
          map(professionnels => {
            return professionnels
              .map(prof => {
                const etablissement = etablissements.find(e => e.id === prof.etablissementId);
                const etablissementNom = etablissement ? etablissement.nom : 'Non spécifié';
                const communeId = etablissement ? etablissement.communeId : null;
                const communeNom = communeId !== null ? communeMap.get(communeId) : 'Non spécifié';
                console.error('##########les communes avec leur ID', communeId,communeNom,etablissementNom);
                return {
                  ...prof,
                  etablissementNom,
                  communeNom
                };
              })
              .filter(prof => {
                // Filtrer par commune si fourni
                const communeFiltre = !communeNom || prof.communeNom?.toLowerCase().startsWith(communeNom.toLowerCase());

                // Filtrer par profession si fourni, avec startsWith insensible à la casse
                const professionFiltre = !profession || prof.profession?.toLowerCase().startsWith(profession.toLowerCase());

                // Filtrer par nom (prénom) si fourni, avec startsWith insensible à la casse
                const nomFiltre = !nom || prof.prenom?.toLowerCase().startsWith(nom.toLowerCase());

                return communeFiltre && professionFiltre && nomFiltre;
              });
          })
        );
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des professionnels', error);
        return of([]); // Retourner un tableau vide en cas d'erreur
      })
    );
  }

  // Méthode pour récupérer les professionnels avec pagination
  getProfessionnelsPaginated(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/professionnels`, {
      params: {
        _page: page.toString(),
        _limit: pageSize.toString()
      }
    }).pipe(
      map(response => {
        return {
          items: response.body,     // Les données paginées
          total: parseInt(response.headers.get('X-Total-Count'), 10) // Le total pour la pagination
        };
      })
    );
  }


}
