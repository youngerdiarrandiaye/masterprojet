import {forwardRef, Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


import {map, Observable, switchMap} from "rxjs";
import {FamilyMember, Subscription} from "../model/subscription.model";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = 'http://localhost:3000/subscriptions';

  constructor(private http: HttpClient) {}

  getSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiUrl);
  }

  getSubscription(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/${id}`);
  }

  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.apiUrl, subscription);
  }

  updateSubscription(subscription: Subscription): Observable<Subscription> {
    if (subscription.id) {
      return this.http.put<Subscription>(`${this.apiUrl}/${subscription.id}`, subscription);
    } else {
      throw new Error('Subscription ID is required for update');
    }
  }

  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkEmailExists(email: string): Observable<boolean> {
    // Faire un GET et vérifier si l'email existe
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      // Utiliser map pour transformer un tableau en un boolean
      map((subscriptions: any[]) => subscriptions.length > 0)
    );
  }
  addFamilyMember(subscriptionId: number, familyMember: FamilyMember): Observable<Subscription> {
    return this.getSubscription(subscriptionId).pipe(
      switchMap(subscription => {
        subscription.familyMembers.push(familyMember);
        return this.updateSubscription(subscription);
      })
    );
  }

}
