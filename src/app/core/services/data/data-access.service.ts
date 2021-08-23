import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../../data/user';
import { RequestErrors } from '../../data/models/request-errors';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {
  private apiURL = "http://localhost:3000"

  private requestOptions = {
    headers: {
      responseType: "application/json"
    },
    withCredentials: true
  }

  constructor(private api: HttpClient) { }

  // ---------------------------------- REQUESTS ----------------------------------

  // --------- USERS ---------

  private requestAllUsers(): Promise<User[]> {
    let url = this.genEndpointURL('/users')
    return this.api.get<User[]>(url).toPromise()
  }

  private requestSingleUser(id: number): Promise<User> {
    let url = this.genEndpointURL(`/users/${id}`)
    return this.api.get<User>(url).toPromise()
  }

  private addSingleUser(user: User): Promise<User> {
    let url = this.genEndpointURL(`/users`)
    return this.api.post<User>(url, user, this.requestOptions).toPromise()
  }

  private removeSingleUser(id: number): Promise<User> {
    let url = this.genEndpointURL(`/users/${id}`)
    return this.api.delete<User>(url).toPromise()
  }

  // ---------------------------------- PUBLIC INTERFACE ----------------------------------

  // --------- USERS ---------

  async getAllUsers(): Promise<User[]> {
    let users = await this.requestAllUsers()
    return users
  }

  async getUserById(id: number): Promise<User | void> {
    let promise = this.requestSingleUser(id)
    try{
      return await promise
    }
    catch(e){
      if(e instanceof HttpErrorResponse){
        if(e.status == 404){
          throw RequestErrors.NotFound
        }
      }
    }
  }

  async addUser(user: User): Promise<User> {
    return await this.addSingleUser(user)
  }

  async removeUser(user: User): Promise<User> {
    await this.removeSingleUser(user.id).catch(e => {
      console.log("caught")
    })

    // bandade since json server doesn't return the user that was deleted
    return user
  }

  // ---------------------------------- HELPER METHODS ----------------------------------

  private genEndpointURL(endpoint: string): string {
    return `${this.apiURL}${endpoint}`
  }
}
