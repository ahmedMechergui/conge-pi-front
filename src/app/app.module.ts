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
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    AppRoutingModule,
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
