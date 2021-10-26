import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Roadtrip } from '../data/models/roadtrip/roadtrip';
import { User } from '../data/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private router: Router) { }

  routeToUserPage(user: User): void {
    this.router.navigate(['users', user.id])
  }

  routeToNotFoundPage(): void {
    this.router.navigate(['404'])
  }

  routeToRoadtripPage(roadtrip: Roadtrip): void {
    this.router.navigate(['roadtrips', roadtrip.id])
  }
}
