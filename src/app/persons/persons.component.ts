import { Component, OnInit, OnDestroy } from '@angular/core';

import { PersonsService } from './persons.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html'
})
export class PersonsComponent implements OnInit, OnDestroy {
  personList: string[];
  isFetching = false;
  private personListSubs: Subscription;

  // adding private in the constructor variable makes
  // an attribute for the class and injects the service
  // in the variable
  // private personsService: PersonsService;

  constructor(private personsService: PersonsService) {
    // Not recomended way
    // this.personList = personsService.persons;
    // this.personsService = personsService;
  }

  // Is recomended to initialize things in ngOnInit method
  // and not in the constructor
  ngOnInit() {
    this.personListSubs = this.personsService.personsChanged.subscribe(persons => {
      this.personList = persons;
      this.isFetching = false;
    });
    this.isFetching = true;
    this.personsService.fetchPersons();
  }

  ngOnDestroy() {
    this.personListSubs.unsubscribe();
  }

  onRemovePerson(name: string) {
    this.personsService.removePerson(name);
  }
}
