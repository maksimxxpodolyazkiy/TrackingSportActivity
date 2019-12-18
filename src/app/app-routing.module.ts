import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { MainComponent } from "./components/main/main.component";

const routes: Route[] = [
  { path: "", redirectTo: "main", pathMatch: "full" },
  { path: "main", component: MainComponent },
  { path: "auth", component: AuthComponent },
  { path: "**", redirectTo: "main" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
