import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Csas {

  data: any = {};
  headers: Headers = null;

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Authorization', 'Bearer demo_b8d3fb54a86b63641727eba34fd638ef');
    this.headers.append('WEB-API-key', '0bca73a4-0ebb-4837-a841-7dcb189e9c02');
  }

  public getTransactions(enhanced: boolean) {
    if (!enhanced) {
      return new Promise((resolve, reject) => {
        this.http.get('https://www.csas.cz/webapi/api/v1/netbanking/my/accounts/CZ5608000000002326573123/transactions?dateStart=2016-09-15T00:00:00Z&dateEnd=2016-10-15T00:00:00Z',
          {headers: this.headers})
          .map(res => res.json())
          .subscribe(data => {
            // this.actualPage++;
            this.data.transactions = data['transactions'];

            this.data.transactions[0].enhanced = {
              'type' : 'kolonial'
            };

            resolve(this.data);
          }, (error) => {
            reject(error);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        this.http.post('http://bylonaspetbank01.azurewebsites.net',
          {
            'bank_url' : 'https://www.csas.cz/webapi/api/v1/netbanking/my/accounts/CZ5608000000002326573123/transactions?dateStart=2016-09-15T00:00:00Z&dateEnd=2016-10-15T00:00:00Z',
            'access_token' : 'demo_b8d3fb54a86b63641727eba34fd638ef',
            'api_key' : '0bca73a4-0ebb-4837-a841-7dcb189e9c02'
          },
          {headers: null})
          .map(res => res.json())
          .subscribe(data => {
            this.data.transactions = data['transactions'];

            resolve(this.data);
          }, (error) => {
            reject(error);
          });

      });
    }

  }

  getEnhancedData(transaction: any) {

    if (transaction.enhanced && transaction.enhanced.type === 'kolonial') {
      return new Promise((resolve, reject) => {
        let params: URLSearchParams = new URLSearchParams();
        params.set('client_id', '5');
        params.set('client_secret', '____API_SECRET_HERE____');
        params.set('username', 'example@example.cz');
        params.set('password', 'example');
        params.set('variable_symbol', transaction.variableSymbol);

        this.http.get(transaction.enhanced.server,
          {search: params})
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          }, (error) => {
            reject(error);
          });

      });
    } else if (transaction.enhanced && transaction.enhanced.type === 'uber') {
      return new Promise((resolve, reject) => {
        let params: URLSearchParams = new URLSearchParams();
        params.set('ride_prices', '10');

        this.http.get(transaction.enhanced.server,
          {search: params})
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          }, (error) => {
            reject(error);
          });

      });
    }

  }

}
