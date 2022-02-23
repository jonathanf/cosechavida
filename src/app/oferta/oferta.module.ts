import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OfertaPageRoutingModule } from './oferta-routing.module';

import { OfertaPage } from './oferta.page';
import { IonicSelectableModule } from '@ionic-selectable/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OfertaPageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [OfertaPage]
})
export class OfertaPageModule {}
