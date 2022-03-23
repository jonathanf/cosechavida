import { Component, OnInit } from '@angular/core';
import { Storage, StoragePlugin } from '@capacitor/storage';
import { PostServiceService } from 'src/app/services/post-service.service'; //importamos nuestro service
import { Router,NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadinggenericService } from 'src/app/services/loading-generic/loadinggeneric.service';
import { PluginListenerHandle } from '@capacitor/core';
import { Network } from '@capacitor/network';
import { MenuController, Platform}  from "@ionic/angular";
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';



const isEmptyCart: boolean= true;

interface Oferta {
  id: number;
  ordere: string;
  date: string;
  name: string;
  cantidad: number;
  uom:number;
  price:number;
}

interface Order {
  order_id: number;
  ordere: string;
  date: string;
  name: string;
  product_qty: number;
  date_planned:string;
  product_uom:number;
  product_id:number;
  price_unit:number;
}
interface Ofertase {
  id: number;
  item:{
    order_id: number;
    ordere: string;
    date: string;
    name: string;
    product_qty: number;
    date_planned:string;
    product_uom:number;
    product_id:number;
    price_unit:number;
      }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private database: SQLiteObject;

  estado:boolean = true;
  products = [];
  export = null;
  newProduct = 'My cool product';
  testValue = {};
  orderValue: number;
  ordernameV: string;
  orderdateV: string;
  ofertas: Oferta[] = [];
  itemsO: Oferta[] = [];

  items1: Order[] = [];

  orders: Order[]=[];
  o1: Order[]=[];
  oferte: Order[] = [];
  ofert1={};





  testValue1 = {};
  constructor(
    public postServices:PostServiceService,
    private router: Router,
    public toastController: ToastController,
    public loading: LoadinggenericService,
    private menuCtrl: MenuController,
    private sqlite: SQLite,
    public platform: Platform



    ) {                  
      
      this.platform.backButton.subscribeWithPriority(10, () => {
        console.log('Handler was called!');
      });
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db; 

        db.executeSql('create table if not exists items(order_id VARCHAR(32),ordere VARCHAR(32), date VARCHAR(32), name VARCHAR(32),product_qty VARCHAR(32), product_uom VARCHAR(32),product_id VARCHAR(32),price_unit VARCHAR(32))', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));
  }

  ngOnInit() {
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      if(status.connected == false)
      {
        this.estado = false;
      }
      if(status.connected == true)
      {
        this.estado = true;
      }
    });
  }

  async ofertasEnviadas(){
    this.router.navigate(['enviadas']);

  }
  async sincprod(){

    try{
       
        if(this.estado == true)
        {
      
      this.loading.present();
      console.log(localStorage.getItem("token"))
      await this.postServices.getProd(localStorage.getItem("token"))
              .then(data => {
                this.testValue = data;
              })
              .catch(function(e) {
              });

               Storage.set({
                key: 'products',
                value: JSON.stringify(this.testValue)
              })
              const item =  Storage.get({ key: 'products' });
              console.log((await item).value);  
              this.loading.dismissed();

              this.presentToast('Productos sincronizados con éxito');
        
        }
        else {              this.loading.dismissed();
          this.presentToast('Necesitas internet para sincronizar!');

        }
  
        }
                
        catch(error) {
          this.loading.dismissed();
          await this.presentToast('Error de internet');
      }        
              }
              

              async oferta(){
                this.router.navigate(['oferta']);

              
              }

    async enviaroferta(){

      try
      {
        if(this.estado == true)
        {
        this.loading.present();


        const i1 = await Storage.get({ key: 'oferta' });
        this.itemsO = JSON.parse(i1.value.toString());
        console.log('2++>'+this.itemsO);  
                const partner_id = await localStorage.getItem("partner_id")
                await this.postServices.postOrder(partner_id, localStorage.getItem("token"))
                .then(data => {
                  this.orderValue = data[0]['id'];

                  this.ordernameV = data[0]['display_name'];

                  this.orderdateV = data[0]['date_order'].substr(0, 10);
                  console.log('1++>'+this.orderValue);  

                  console.log('2++>'+this.ordernameV);  

                  console.log('3++>'+this.orderdateV);  

                })
                .catch(function(e) {
                });




                for(var i3 = 0; i3 < this.itemsO.length ; i3++){
                  this.o1.push({
                    order_id: this.orderValue,
                    ordere:this.ordernameV,
                    date: this.orderdateV,
                    name: this.itemsO[i3].name,
                    product_qty: this.itemsO[i3].cantidad,
                    date_planned:'01-01-2022',
                    product_uom:this.itemsO[i3].uom,
                    product_id:this.itemsO[i3].id,
                    price_unit:this.itemsO[i3].price
                  });
                  console.log('3++>'+JSON.stringify(this.o1));  
                  this.orders.push(this.o1[i3]);
                  await this.postServices.postOrderLine(this.o1[i3], localStorage.getItem("token"))
                  this.oferte.push(this.o1[i3]);

                  try{
                  let q = "INSERT INTO items(order_id,ordere,date,name,product_qty,product_uom,product_id,price_unit) VALUES (?,?,?,?,?,?,?,?)";
                  let data = [this.orderValue,this.ordernameV,this.orderdateV, this.itemsO[i3].name, this.itemsO[i3].cantidad, this.itemsO[i3].uom,this.itemsO[i3].id,this.itemsO[i3].price];
            
                  this.database.executeSql(q,data);
                  this.database.executeSql('SELECT * FROM items', [])
          .then((r =>{
            console.log(r);
         
          }
          ))
    
                  } catch(error) {                
                  this.loading.dismissed();
                  console.log(error);
                  }

                  }
          

                  console.log('4++>'+JSON.stringify(this.orders));  
     
                  await Storage.remove({ key: 'oferta' });
                  await Storage.set({
                    key: 'oferta',
                    value: ''
                  })
                  this.loading.dismissed();
                  ////


//
                  
                  await this.presentToast('Oferta sincronizada con éxito');
                  
                }
                  else {              this.loading.dismissed();
                    this.presentToast('Necesitas internet para sincronizar!');
          
                  }
        
      }
      catch(error) {                this.loading.dismissed();
        await this.presentToast('No existe oferta a ser enviada');
      }
              }

              async ayuda(){
                this.router.navigate(['ayuda']);

              }

              async salir(){
     


                navigator['app'].exitApp();


              }
    
              async presentToast(msg) {
                const toast = await this.toastController.create({
                  message: msg,
                  duration: 2000
                });
                toast.present();
              }

  
  
}
