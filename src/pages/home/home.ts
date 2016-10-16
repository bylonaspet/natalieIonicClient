import { Component } from '@angular/core';

import { NavController, LoadingController, Loading } from 'ionic-angular';
import { Csas } from '../../providers/csas';
import { TransactionDetail } from '../transaction-detail/transaction-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: any = {};
  loader: Loading = null;

  constructor(public navCtrl: NavController, public csasProv: Csas, public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: "Načítám transakce...",
    })
  }

  ionViewDidLoad() {
    this.loader.present().then(() => {
      this.csasProv.getTransactions(true).then(data => {
        this.data = data;
        this.loader.dismissAll();
      })
    });
  }

  openTransaction(transaction: any) {
    this.navCtrl.push(TransactionDetail, {transaction: transaction})
  }

}
