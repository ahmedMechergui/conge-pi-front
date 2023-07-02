import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import {RouterLinkWithHref} from "@angular/router";
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidebarComponent,
    HeaderComponent,
  ],
    imports: [
        BrowserModule,
        RouterLinkWithHref
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
