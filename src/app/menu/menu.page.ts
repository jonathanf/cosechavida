import { Component, OnInit } from '@angular/core';
import { Storage, StoragePlugin } from '@capacitor/storage';
import { PostServiceService } from 'src/app/services/post-service.service'; //importamos nuestro service
import { Router,NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoadinggenericService } from 'src/app/services/loading-generic/loadinggeneric.service';



interface Oferta {
  id: number;
  name: string;
  cantidad: number;
  uom:number;
  price:number;
}

interface Order {
  order_id: number;
  name: string;
  product_qty: number;
  date_planned:string;
  product_uom:number;
  product_id:number;
  price_unit:number;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  products = [];
  export = null;
  newProduct = 'My cool product';
  testValue = {};
  orderValue;
  ofertas: Oferta[] = [];
  itemsO: Oferta[] = [];
  orders: Order[]=[];
  o1: Order[]=[];



  testValue1 = {};
  constructor(
    public postServices:PostServiceService,
    private router: Router,
    public toastController: ToastController,
    public loading: LoadinggenericService,


    ) { }

  ngOnInit() {
  }

  async sincprod(){

    try{
      this.loading.present();

  console.log(localStorage.getItem("token"))
  
    await this.postServices.getProd(localStorage.getItem("token"))
              .then(data => {
                this.testValue = data;
              })
              .catch(function(e) {
              });

              await Storage.set({
                key: 'products',
                value: JSON.stringify(this.testValue)
              })
              const item = await Storage.get({ key: 'products' });
              console.log(item);  
              this.loading.dismissed();

              this.presentToast('Productos sincronizados con éxito');
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
        this.loading.present();
        const i1 = await Storage.get({ key: 'oferta' });
        this.itemsO = JSON.parse(i1.value.toString());
        console.log('2++>'+this.itemsO);  
                const partner_id = await localStorage.getItem("partner_id")
                await this.postServices.postOrder(partner_id, localStorage.getItem("token"))
                .then(data => {
                  this.orderValue = data;
                  console.log('1++>'+this.orderValue);  

                })
                .catch(function(e) {
                });

                console.log('2++>'+this.itemsO);  

                for(var i3 = 0; i3 < this.itemsO.length ; i3++){
                  this.o1.push({
                    order_id: this.orderValue,
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

                  }
                  console.log('4++>'+JSON.stringify(this.orders));  

                  await Storage.remove({ key: 'oferta' });
                  await Storage.set({
                    key: 'oferta',
                    value: ''
                  })
                  this.loading.dismissed();

                  await this.presentToast('Oferta sincronizada con éxito');
        
      }
      catch(error) {                this.loading.dismissed();
        await this.presentToast('No existe oferta a ser enviada');
      }
              }

              async ayuda(){
                this.router.navigate(['ayuda']);

              }

              async salir(){
                localStorage.setItem("token","");
                localStorage.setItem("partner_id","");
                this.router.navigate(['home']);

              }
    
              async presentToast(msg) {
                const toast = await this.toastController.create({
                  message: msg,
                  duration: 2000
                });
                toast.present();
              }

  
  
}
