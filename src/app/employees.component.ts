import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { Employee } from './data/Employee';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  loadingError = false;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  private getEmployeesSub: any;
  private keyword: string;

  constructor(private router: Router, private emp: EmployeeService) { }

  // populate the "employees" and "filteredEmployees"
  // properties using the EmployeeService service
  ngOnInit() {
    this.getEmployeesSub =
    this.emp.getEmployees().subscribe(emps => {
        this.employees = emps;
        this.filteredEmployees = emps;
      }, () => { this.loadingError = true; }
    );
  }

  // navigate" the to the /employee/id route
  routeEmployee(id: string) {
    this.router.navigate(['/employee/', id]);
  }

  // call the "unsubscribe()" methods on any saved subscriptions within the component
  ngOnDestroy() {
    this.getEmployeesSub.unsubscribe();
  }

  // filter the full employees array into the custom filtered filteredEmployees array
  onEmployeeSearchKeyUP(event: any) {
    this.keyword = event.target.value;

    this.filteredEmployees =  this.employees.filter(
      e => e.FirstName.indexOf(this.keyword) !== -1
        || e.LastName.indexOf(this.keyword) !== -1
    );
  }
}
