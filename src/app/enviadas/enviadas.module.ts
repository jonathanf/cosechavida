import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviadasPageRoutingModule } from './enviadas-routing.module';

import { EnviadasPage } from './enviadas.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviadasPageRoutingModule, Ng2SearchPipeModule
  ],
  declarations: [EnviadasPage]
})
export class EnviadasPageModule {}
