import { Component, OnInit, OnDestroy } from '@angular/core';
import { PositionService } from './position.service';
import { Router } from '@angular/router';
import { Position } from './data/Position';
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {

  // Properties
  loadingError = false;
  positions: Position[] = [];
  private getPositionsSub: any;

  constructor(private router: Router, private pos: PositionService) { }

  // populate the "positions" using the PositionService service
  ngOnInit() {
    this.getPositionsSub =
      this.pos.getPositions().subscribe(poss => { this.positions = poss;
      }, () => { this.loadingError = true; }
      );
  }

  // navigate" the to the /position/id route
  routePosition(id: string) {
    this.router.navigate(['/position/', id]);
  }

  // call the "unsubscribe()" methods on any saved subscriptions within the component
  ngOnDestroy() {
    this.getPositionsSub.unsubscribe();
  }

}
