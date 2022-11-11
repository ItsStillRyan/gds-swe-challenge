import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './component/search/search.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { SearchFilterComponent } from './component/search-filter/search-filter.component';
import { UsersComponent } from './component/users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { UserListComponent } from './component/user-list/user-list.component';

const route: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users/:id', component: UserDetailsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchBarComponent,
    SearchFilterComponent,
    UsersComponent,
    NavbarComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(route, {enableTracing: true}),
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
