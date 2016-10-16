import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { Csas } from '../../providers/csas';
import { InAppBrowser } from 'ionic-native';

/*
  Generated class for the TransactionDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-transaction-detail',
  templateUrl: 'transaction-detail.html'
})
export class TransactionDetail {

  transaction: any = null;
  transactionItems: any;
  loader: Loading;


  constructor(public navCtrl: NavController, public params: NavParams, public csasProv: Csas, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.loader = this.loadingCtrl.create({
      content: "Načítám...",
    })
  }

  ionViewDidLoad() {
    this.transaction = this.params.get('transaction');
    this.loadEnhanced();
  }

  loadEnhanced() {
    if (this.transaction.enhanced.type !== null) {
      this.loader.present().then(() => {
        this.csasProv.getEnhancedData(this.transaction).then(data => {
          this.loader.dismiss();
          this.transactionItems = data;
        });
      });

    }
  }

  openUrl(url: string) {
    new InAppBrowser(url, '_system');
  }

  orderAgain() {
    let alert = this.alertCtrl.create({
      title: 'Pouze v placené verzi',
      buttons: ['OK']
    });
    alert.present();
  }

}
