import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { DialogConfirmComponent } from './component/dialog-confirm/dialog-confirm.component';
import { DialogEditComponent } from './component/dialog-edit/dialog-edit.component';
import { SalaryFilterComponent } from './component/salary-filter/salary-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    DialogConfirmComponent,
    DialogEditComponent,
    SalaryFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
