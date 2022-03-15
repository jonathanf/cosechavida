import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviadasPage } from './enviadas.page';

const routes: Routes = [
  {
    path: '',
    component: EnviadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviadasPageRoutingModule {}
