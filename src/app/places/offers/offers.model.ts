import { Place } from '../places.model';

export class Offer {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imageUrl: string,
    public place: Place
  ) {}
}
