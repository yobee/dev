import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  keywords: string = "";
  events: any[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  getEvents(ev) {
    const searchKeywords:string = this.keywords.trim();

    if (!searchKeywords) return;

    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    const kwds = searchKeywords.split(' ').filter(v => v !== "");
    this.eventProvider.search(kwds).subscribe((body: any) => {
      if (body && body.events) {
        if (this.keywords === searchKeywords) {
          this.events = body.events;
        }
      }
      loader.dismiss();
    }, (error: any) => {
      loader.dismiss();
    })
  }

  openEvent(event) {
    this.navCtrl.push('EventDetailPage', {
      event: event
    });
  }
}
