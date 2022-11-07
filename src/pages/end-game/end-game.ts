import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the EndGamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-end-game",
  templateUrl: "end-game.html",
})
export class EndGamePage implements OnInit {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EndGamePage");
  }
}
