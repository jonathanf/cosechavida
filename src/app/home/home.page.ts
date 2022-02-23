import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
//import { Subscription } from 'rxjs/Subscription';
import { LoadinggenericService } from 'src/app/services/loading-generic/loadinggeneric.service';
import { PostServiceService } from 'src/app/services/post-service.service'; //importamos nuestro service
import { Router,NavigationExtras } from '@angular/router';





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
    private router: Router,) {}
  ngOnInit() {


    console.log()
  }

  async register(data:NgForm){
    //this.loginSubscription = data.form.valueChanges.subscribe(form => {
      //console.log(form);
    //  this.updated = form;
   // });                

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


  }



}
