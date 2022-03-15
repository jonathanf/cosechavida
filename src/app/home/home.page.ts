import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
//import { Subscription } from 'rxjs/Subscription';
import { LoadinggenericService } from 'src/app/services/loading-generic/loadinggeneric.service';
import { PostServiceService } from 'src/app/services/post-service.service'; //importamos nuestro service
import { Router,NavigationExtras } from '@angular/router';
import { MenuController,Platform}  from "@ionic/angular";
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //loginSubscription: Subscription;
  updated: any;



  constructor(
    public loading: LoadinggenericService,
    public postServices:PostServiceService,
    private router: Router,
    private menuCtrl: MenuController,
    public platform: Platform,
    private sqlite: SQLite,


    ) {                    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
    });
  }
  ngOnInit() {
    try{
    const storage = Object.entries(localStorage);
    const found = storage.find(([key]) => /.*token$/.test(key));
    if (found[1])
    {
    this.router.navigate(['menu']);
    }
    console.log(found[0], found[1]);
  }catch(error){}
  
    //console.log()
  }

  async register(data:NgForm){
    //this.loginSubscription = data.form.valueChanges.subscribe(form => {
      //console.log(form);
    //  this.updated = form;
   // });                
   this.loading.present();

              document.getElementById("msg").innerHTML = '';
              this.postServices.getPosts(data.value.name,data.value.password )
              .then(data => {
                console.log(data['result']['response']['data']['access_token']);
                localStorage.setItem("token",data['result']['response']['data']['access_token']);
                localStorage.setItem("partner_id",data['result']['response']['data']['partner_id']);

                this.router.navigate(['menu']);
                this.loading.dismissed();
              })
              .catch(function(e) {
                document.getElementById("msg").innerHTML = 'Por favor, revise los datos ingresados';
                this.loading.dismissed();

              });
      

                data.resetForm(); 
                
              //  this.loginSubscription.unsubscribe();


  }
  async olvidar(){
    localStorage.setItem("token","");
    localStorage.setItem("partner_id","");
    localStorage.setItem("ofertas","");
    localStorage.setItem("productos","");
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
        db.executeSql('Drop table items', [])
      })
      .catch(e => console.log(e));
  }



}
