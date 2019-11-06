import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { GameComponent } from "./game/game.component";
import { FormsModule } from "@angular/forms";
import { HighScoreComponent } from "./highlights/highlights.component";
import { GameService } from "./game.service";

export const routes: Routes = [
  { path: "home", pathMatch: "full", component: HomeComponent },
  { path: "game", pathMatch: "full", component: GameComponent },
  { path: "", pathMatch: "full", redirectTo: "home" }
];
export const declComponents: any[] = [
  AppComponent,
  HomeComponent,
  GameComponent,
  HighScoreComponent
];
export const imports: any[] = [
  BrowserModule,
  RouterModule.forRoot(routes),
  FormsModule
];

@NgModule({
  declarations: declComponents,
  imports: imports,
  providers: [GameService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule {}
