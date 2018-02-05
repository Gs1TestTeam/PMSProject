import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Position } from './data/position';


@Injectable()
export class PositionService {

  urlString = 'https://agile-retreat-67872.herokuapp.com/';

  constructor(private http: HttpClient) { }

  // This method must make a "get" request (using the HTTPClient module)
  // to your Teams API running on heroku with the path: "/positions".
  // It will return an Observable of type Position[], ie: Observable<Position[]>
  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.urlString + 'positions');
  }

  // This method must make a "get" request (using the HTTPClient module)
  // to your Teams API running on heroku with the path: "/position/id"
  // (where "id" matches the "id" parameter to the function.  It will return
  // an Observable of type Position[], ie: Observable<Position[]>.  Note, the API
  // will return an array with one element (containing the Position object)
  getPosition(id): Observable<Position[]> {
    return this.http.get<Position[]>(this.urlString + 'position/' + id);
  }

  // This method must make a "put" request (using the HTTPClient module) to your
  // Teams API running on heroku with the path: "/position/id" (where "id" matches
  // the "id" parameter to the function.  It will return an Observable of type any,
  // ie: Observable<any>.  NOTE: with a "put" request, you can send the data in
  // the second parameter
  savePosition(position: Position): Observable<any> {
    return this.http.put<any>(this.urlString + 'position/' + position._id, position);
  }
}
