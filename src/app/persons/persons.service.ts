import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PersonsService {
  personsChanged = new Subject<string[]>();
  public persons: string[];

  constructor(private httpClient: HttpClient) {}

  fetchPersons() {
    this.httpClient.get<any>('https://swapi.co/api/people/')
      .pipe(map(response => {
        // Applying map to the array in this arrow function
        // return only the name key i wanted in the response
        return response.results.map(result => result.name);
      }))
      .subscribe(response => {
        this.persons = response;
        this.personsChanged.next(response);
      });
  }

  addPerson(name: string) {
    this.persons.push(name);
    this.personsChanged.next(this.persons);
  }

  removePerson(name: string) {
    this.persons = this.persons.filter(person => {
      return person !== name;
    });

    this.personsChanged.next(this.persons);
    console.log('A pessoa foi removida!');
  }
}
