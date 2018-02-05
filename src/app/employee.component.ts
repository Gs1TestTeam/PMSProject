import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from './employee.service';
import { PositionService } from './position.service';
import { LogService } from './log.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeRaw } from './data/EmployeeRaw';
import { Position } from './data/Position';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  // Properties
  private id: number;
  private paramSubScription: any;
  private employeeSubscription: any;
  private getPositionsSub: any;
  private saveEmployeeSubscription: any;
  employee: EmployeeRaw;
  positions: Position[] = [];
  successMessage = false;

  constructor(private actRouter: ActivatedRoute,
              private emp: EmployeeService,
              private pos: PositionService,
              private log: LogService
            ) { }

  // determine what the value of the _id variable is in the Route parameter using the ActivatedRoute service
  // use the value of _id to populate the "employee" property using the EmployeeService service
  // populate the "positions" property using the PositionService service
  ngOnInit() {
    this.paramSubScription = this.actRouter.params.subscribe(params => {
                                this.id = params['_id'];
                              });
    this.employeeSubscription =
      this.emp.getEmployee(this.id).subscribe(emp => this.employee = emp[0]);
    this.getPositionsSub =
      this.pos.getPositions().subscribe(poss => this.positions = poss);
  }

  // persist ("save") the "employee" property using the EmployeeService service
  // write a "success" message to the log
  onSubmit() {
    this.saveEmployeeSubscription = this.emp.saveEmployee(this.employee).subscribe(() => {
      this.log.writeLog('updated employee: ' + this.employee.FirstName + ' ' + this.employee.LastName);
      this.successMessage = true;
    });
    const timeSet = setTimeout(() => this.successMessage = false, 2500);
  }

  // call the "unsubscribe()" methods on any saved subscriptions within the component
  ngOnDestroy() {
    this.paramSubScription.unsubscribe();
    this.employeeSubscription.unsubscribe();
    this.getPositionsSub.unsubscribe();
    if (this.successMessage) {
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}
