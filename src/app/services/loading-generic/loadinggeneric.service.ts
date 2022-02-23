import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadinggenericService {
  isLoading:boolean;
  constructor(public loadingController: LoadingController) { 
    this.isLoading = false;
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere por favor...',
      translucent: false,
      backdropDismiss: false
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if(!this.isLoading)
          a.dismiss().then(() => console.log('abort presenting')
          )
      })
    });
  }

  async dismissed(){
    this.isLoading = false;
    return  await this.loadingController.dismiss().then(() => console.log('dismissed'))
  }
}
