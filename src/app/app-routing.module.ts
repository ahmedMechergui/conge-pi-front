import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ContractComponent} from "./contract/contract.component";


const appRoutes: Routes = [
  {path: "contract", component: ContractComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
