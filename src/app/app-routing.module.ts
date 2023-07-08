import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ContractComponent} from "./contract/contract.component";
import {CongeReplacementComponent} from "./conge-replacement/conge-replacement.component";


const appRoutes: Routes = [
  {path: "contract", component: ContractComponent},
  {path: "replacement", component: CongeReplacementComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
