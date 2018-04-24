import { QuotesService } from './../../services/quotes';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

  quoteGroup: { category: string, quotes: Quote[], icon: string };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private quoteService: QuotesService,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  onAddFavoriteClicked(selectedQuote: Quote) {
    const alert = this.alertCtrl.create({
      title: 'Add to Favorites',
      message: 'You sure you want to add this quote to favorites?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { console.log("Cancel Clicked"); }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.quoteService.addQuoteToFavorites(selectedQuote);
            console.log("Confirm Clicked");
          }
        }
      ]
    });
    alert.present();
  }

  onRemoveFavoriteClicked(selectedQuote:Quote){
    this.quoteService.removeQuoteFromFavorites(selectedQuote);
  }

  isFavorite(quote: Quote) {
    return this.quoteService.isQuoteFavorite(quote);
  }
}
