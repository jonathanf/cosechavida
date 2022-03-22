import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "./../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  url = `${environment.rutas.login}`;
  urlP = `${environment.rutas.producto}`;
  urlO = `${environment.rutas.order}`;
  urlOL = `${environment.rutas.orderline}`;
  order_id ={};




  constructor(public httpClient: HttpClient) { }

  getPosts(user, pass){
    return new Promise(resolve=>{
      const headers = {'Content-Type': 'application/json' };
      const body = {"db": `${environment.bd}`, "login": user, "password": pass, "never_expire": true};
      
      this.httpClient.post(this.url, body).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });
  }

  getProd(token){
    return new Promise(resolve=>{
      const headers = {'Authorization': 'Token '+token };
      const body = {};
      
      this.httpClient.get(this.urlP, {headers}).subscribe(data=>{
          resolve(data);
      },error=>{
        console.log(error);
      });
    });


  }

  async postOrder(partner_id, token){
    return new Promise(resolve=>{
      const headers = {'Authorization': 'Token '+token };
      const body = {'partner_id':partner_id};
      console.log('PO++>'+JSON.stringify(body));

      this.httpClient.post(this.urlO,body,{headers}).subscribe(data=>{
          this.order_id = JSON.parse( JSON.stringify(data['result']));
          console.log('PO++>'+JSON.stringify(data['result']));
          resolve(this.order_id['response']['data'])

        //  resolve(this.order_id['response']['data'][0]['display_name']+'-'+this.order_id['response']['data'][0]['date_order'].substr(0, 10))
      },error=>{
        console.log(error);
      });
    


    });

    


    
  }
  async postOrderLine(orders,token){
    return new Promise(resolve=>{
    const headers = {'Authorization': 'Token '+token};
    const body = orders;
    console.log('POL++>'+JSON.stringify(body));
    this.httpClient.post(this.urlOL,body,{headers}).subscribe(data=>{        
      resolve(data);
      console.log(data['result']);

  },error=>{
    console.log(error);
  });
  });

}

}
