import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Employee } from './data/employee';
import { EmployeeRaw } from './data/employeeRaw';

@Injectable()
export class EmployeeService {

  urlString = 'https://agile-retreat-67872.herokuapp.com';
    constructor(private http: HttpClient) { }

  // This method must make a "get" request (using the HTTPClient module)
  // to your Teams API running on heroku with the path: "/employees".
  // It will return an Observable of type Employee[]
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.urlString + '/employees');
  }

  // This method must make a "get" request (using the HTTPClient module)
  // to your Teams API running on heroku with the path: "/employee-raw/id"
  // (where "id" matches the "id" parameter to the function.  It will
  // return an Observable of type EmployeeRaw[], ie: Observable<EmployeeRaw[]>.
  // Note, the API will return an array with one element (containing the "raw" Employee object)
  getEmployee(id): Observable<EmployeeRaw[]> {
    return this.http.get<EmployeeRaw[]>(this.urlString + '/employee-raw/' + id);
  }

  // This method must make a "put" request (using the HTTPClient module) to
  // your Teams API running on heroku with the path: "/employee/id" (where "id"
  // matches the "id" parameter to the function.  It will return an Observable
  // of type any, ie: Observable<any>.  NOTE: with a "put" request, you can send
  // the data in the second parameter
  saveEmployee(employee: EmployeeRaw): Observable<any> {
    return this.http.put<any>(this.urlString + '/employee/' + employee._id, employee);
  }
}
