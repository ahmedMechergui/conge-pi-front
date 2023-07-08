import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { CongeComponent } from './components/conge/conge.component';



@NgModule({
  
  imports: [
    RouterModule.forRoot([
      {
        path: 'conge', component: CongeComponent
      }
    ])
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
