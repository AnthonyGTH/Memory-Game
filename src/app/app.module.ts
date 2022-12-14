import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { CardComponent } from "../components/card/card";
import { GameheaderComponent } from "../components/gameheader/gameheader";
import { LogicProvider } from "../providers/logic/logic";
import { EndGamePage } from "../pages/end-game/end-game";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CardComponent,
    GameheaderComponent,
    EndGamePage,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, EndGamePage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LogicProvider,
  ],
})
export class AppModule {}
