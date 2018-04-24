import { SettingService } from './../../services/setting';
import { QuotePage } from './../quote/quote';
import { QuotesService } from './../../services/quotes';
import { Quote } from './../../data/quote.interface';

import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  favoriteQuotes: Quote[];

  constructor(
    public navCtrl: NavController,
    private quoteService: QuotesService,
    private modalCtrl: ModalController,
    private settingService: SettingService,
    public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.favoriteQuotes = this.quoteService.getFavoriteQuotes();
  }

  onFavoriteQuoteClicked(favoriteQuote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, favoriteQuote);
    modal.present();
    modal.onDidDismiss((remove) => {
      if (remove) {
        this.onDeleteClicked(favoriteQuote);
      }
    });
  }

  onDeleteClicked(favoriteQuote:Quote){
    this.quoteService.removeQuoteFromFavorites(favoriteQuote);
    const position = this.favoriteQuotes.findIndex((quoteEl: Quote) => {
      return favoriteQuote.id == quoteEl.id;
    });
    this.favoriteQuotes.splice(position, 1);
  }

  isAltBackground(){
    return this.settingService.isAltBackground()? 'altQuoteBackground':'quoteBackground';
  }



}
