import { Component, OnInit, OnDestroy } from '@angular/core';
import { PositionService } from './position.service';
import { LogService } from './log.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeRaw } from './data/EmployeeRaw';
import { Position } from './data/Position';
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {

  // Properties
  private id: number;
  private paramSubScription: any;
  private positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage = false;

  constructor(private actRouter: ActivatedRoute,
    private pos: PositionService,
    private log: LogService
  ) { }

  // determine what the value of the _id variable is in the Route parameter using the ActivatedRoute service
  // use the value of _id to populate the "position" property
  // populate the "position" property using the PositionService service
  ngOnInit() {
    this.paramSubScription = this.actRouter.params.subscribe(params => {
                                this.id = params['_id'];
                              });
    this.positionSubscription =
      this.pos.getPosition(this.id).subscribe(posRaw => this.position = posRaw[0]);
  }

  // persist ("save") the "employee" property using the EmployeeService service
  // write a "success" message to the log
  onSubmit() {
    this.savePositionSubscription = this.pos.savePosition(this.position).subscribe(() => {
      this.log.writeLog('updated position: ' + this.position.PositionName);
      this.successMessage = true;
    });
    const timeSet = setTimeout(() => this.successMessage = false, 2500);
  }

  // call the "unsubscribe()" methods on any saved subscriptions within the component
  ngOnDestroy() {
    this.paramSubScription.unsubscribe();
    this.positionSubscription.unsubscribe();
    if (this.successMessage) {
      this.savePositionSubscription.unsubscribe();
    }
  }
}
