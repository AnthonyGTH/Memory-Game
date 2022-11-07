import { Component, OnInit } from "@angular/core";
import { LogicProvider } from "../../providers/logic/logic";
import { ToastController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage implements OnInit {
  counter: { min: number; sec: number } = { min: 0, sec: 0 };
  public cardMaster = [
    {
      id: 1,
      image: "assets/imgs/lemmling-Cartoon-cat.svg",
    },
    {
      id: 2,
      image: "assets/imgs/lemmling-Cartoon-cow.svg",
    },
    {
      id: 3,
      image: "assets/imgs/lemmling-Cartoon-dog.svg",
    },
    {
      id: 4,
      image: "assets/imgs/lemmling-Cartoon-elephant.svg",
    },
    {
      id: 5,
      image: "assets/imgs/lemmling-Cartoon-giraffe.svg",
    },
    {
      id: 6,
      image: "assets/imgs/lemmling-Cartoon-goat.svg",
    },
    {
      id: 7,
      image: "assets/imgs/lemmling-Cartoon-owl.svg",
    },
    {
      id: 8,
      image: "assets/imgs/lemmling-Cartoon-penguin.svg",
    },
    {
      id: 9,
      image: "assets/imgs/lemmling-Cartoon-sheep.svg",
    },
  ];

  public cardList = [];
  attempts: number;
  sec: number;
  min: number;
  arreglo;
  afterGame: boolean;

  constructor(
    private gameLogic: LogicProvider,
    public toastCtrl: ToastController
  ) {
    this.gameLogic.restartGame.subscribe((restart) => {
      this.cardList = [];
      setTimeout(() => {
        this.buildCardDeck();
      }, 100);
    });
    this.gameLogic.$sec.subscribe((sec) => {
      console.log("counter = ", sec);
      this.sec = sec;
    });
    this.gameLogic.$arreglo.subscribe((arreglo) => {
      console.log("arreglo = ", arreglo);
      this.arreglo = arreglo;
    });
    this.gameLogic.$min.subscribe((min) => {
      console.log("counter = ", min);
      this.min = min;
    });
  }

  ngOnInit() {
    this.buildCardDeck();
  }

  restartGame() {
    this.attempts = 0;
    this.createToast("Cargando...");
    this.afterGame = false;

    this.gameLogic.initModalEndingGame();
  }

  initGame() {
    this.attempts = 0;
    this.createToast("Cargando...");
    this.afterGame = true;
    this.gameLogic.resetGame("restart");
  }

  initGameAfter() {
    this.attempts = 0;
    this.createToast("Cargando...");
    this.afterGame = true;
    this.gameLogic.resetGame("restart");
  }

  createToast(message) {
    const toast = this.toastCtrl.create({
      message,
      duration: 1500,
      position: "middle",
    });
    toast.present();
  }

  home() {
    this.attempts = 0;
    this.gameLogic.resetGame("home");
  }

  buildCardDeck() {
    this.cardList = this.shuffle(this.cardMaster.concat(this.cardMaster));
    for (let i = 0; i < this.cardList.length; i++) {
      this.cardList[i].cardKey = this.guid();
    }
    console.log("cards", this.cardList, this.cardList.length);
  }

  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }
}
