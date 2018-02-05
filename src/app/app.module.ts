import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { NavComponent } from './nav.component';
import { FooterComponent } from './footer.component';
import { LogComponent } from './log.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeesComponent } from './employees.component';
import { EmployeeComponent } from './employee.component';
import { PositionsComponent } from './positions.component';
import { PositionComponent } from './position.component';
import { ContentComponent } from './content.component';

import { PositionService } from './position.service';
import { EmployeeService } from './employee.service';
import { LogService } from './log.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    FooterComponent,
    LogComponent,
    PageNotFoundComponent,
    EmployeesComponent,
    EmployeeComponent,
    PositionsComponent,
    PositionComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MomentModule
  ],
  providers: [PositionService, EmployeeService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
