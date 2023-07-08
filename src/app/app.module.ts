import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {ContractComponent} from './contract/contract.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {ContainerComponent} from './container/container.component';
import {ContractDetailComponent} from './contract/contract-detail/contract-detail.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, Location} from "@angular/common";
import { CongeReplacementComponent } from './conge-replacement/conge-replacement.component';
import {FormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
    ContractComponent,
    HomeComponent,
    ContainerComponent,
    ContractDetailComponent,
    CongeReplacementComponent,
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000, // 5 seconds
      closeButton: true,
      progressBar: true
    }),
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule {
}
