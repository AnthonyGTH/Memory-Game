import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { ModalController } from "ionic-angular";
import { EndGamePage } from "../../pages/end-game/end-game";

@Injectable()
export class LogicProvider {
  [x: string]: any;
  private flipCount = 0;
  private matchFound = false;
  public resetFlag = new Subject();
  public lockMatch = new Subject();
  public clickLock = new Subject<boolean>();
  public restartGame = new Subject();
  public $sec = new Subject<number>();
  public $arreglo = new Subject();
  sec = 0;
  public $min = new Subject<number>();
  min = 0;
  public $attempts = new Subject<number>();
  private attempts = 0;
  public $doneCards = new Subject<number>();
  private doneCards = 0;
  public flippedCards = [];
  counter: { min: number; sec: number };
  type: any;
  timePerRound: any;
  styleTimer: number;
  styleOfGrid: string;
  timeSaver: any;
  counterAll: any;
  isPlaying: number;
  interval: number;
  intervalId: number;
  constructor(public modalCtrl: ModalController) {}

  flipCard(card) {
    this.flippedCards.push(card);
    if (this.flippedCards.length >= 2) {
      this.checkMatch(card);
    }
  }

  checkMatch(card) {
    if (this.flippedCards[0].id === this.flippedCards[1].id) {
      this.lockMatch.next(card);
      this.doneCards++;
      this.$doneCards.next(this.doneCards);
      if (this.doneCards == 9) {
        this.initModalEndingGame();
      }
    } else {
      this.attempts++;
      this.$attempts.next(this.attempts);
      this.resetCards();
    }
    this.flippedCards = [];
  }

  resetCards() {
    this.resetFlag.next(true);
  }

  lockMatches(card) {}

  resetGame(type: string) {
    this.counter = { min: 0, sec: 0 }; // choose whatever you want

    this.doneCards = 0;
    this.$doneCards.next(this.doneCards);
    this.$sec.next(this.counter.sec);
    this.sec = this.counter.sec;
    this.$min.next(this.counter.min);
    this.min = this.counter.min;
    clearInterval(this.intervalId);
    this.flippedCards = [];
    this.restartGame.next({ restart: true });
    if (type != "stop" && type != "home") {
      this.attempts = 0;
      this.$attempts.next(this.attempts);
      this.startTimer();
      this.$arreglo.next(null);
    }

    if (type == "home") {
      this.$arreglo.next(null);
    }
  }

  startTimer() {
    this.counter = { min: 1, sec: 0 }; // choose whatever you want

    this.intervalId = setInterval(() => {
      if (this.counter.sec - 1 === -1) {
        this.counter.min -= 1;
        this.counter.sec = 59;
      } else {
        this.counter.sec -= 1;
      }
      this.$sec.next(this.counter.sec);
      this.sec = this.counter.sec;
      this.$min.next(this.counter.min);
      this.min = this.counter.min;

      if (this.counter.min === 0 && this.counter.sec === 0) {
        clearInterval(this.intervalId);
        this.timeSaver = this.counterAll;
        this.isPlaying = -1;
        this.initModalEndingGame();
      }
    }, 1000);
  }

  initModalEndingGame() {
    this.$arreglo.next({
      time: this.counter,
      doneCards: this.doneCards,
      attempts: this.attempts,
    });
    this.resetGame("stop");
  }
}
