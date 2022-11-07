import { Component } from "@angular/core";
import { LogicProvider } from "../../providers/logic/logic";

@Component({
  selector: "gameheader",
  templateUrl: "gameheader.html",
})
export class GameheaderComponent {
  public attempts = 0;
  sec: number = 0;
  min: number = 0;

  constructor(private gameLogic: LogicProvider) {
    this.gameLogic.$attempts.subscribe((count) => {
      this.attempts = count;
      console.log("attempts = ", count);
    });
    this.gameLogic.$sec.subscribe((count) => {
      this.sec = count;
      console.log("sec = ", count);
    });
    this.gameLogic.$min.subscribe((count) => {
      this.min = count;
      console.log("min = ", count);
    });
  }

  restartGame() {
    this.attempts = 0;
    this.gameLogic.initModalEndingGame();
  }

  initGame() {
    this.attempts = 0;
    this.gameLogic.resetGame("restart");
  }
}
