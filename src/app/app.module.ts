import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { GameComponent } from "./game/game.component";

export const routes: Routes = [
  { path: "home", pathMatch: "full", component: HomeComponent },
  { path: "game", pathMatch: "full", component: GameComponent },
  { path: "", pathMatch: "full", redirectTo: "home" }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, GameComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
