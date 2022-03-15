import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertaPageRoutingModule } from './oferta-routing.module';

import { OfertaPage } from './oferta.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertaPageRoutingModule,
     Ng2SearchPipeModule
  ],
  declarations: [OfertaPage]
})
export class OfertaPageModule {}
