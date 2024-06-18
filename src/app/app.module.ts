import { NgModule } from '@angular/core';
import { BrowserModule, platformBrowser, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { SortSelectorComponent } from './pages/dashboard/sort-selector/sort-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    NotFoundComponent,
    CreateUserComponent,
    SortSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }