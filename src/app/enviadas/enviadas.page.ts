import { Component, OnInit } from '@angular/core';
import { Storage, StoragePlugin } from '@capacitor/storage';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { stringify } from 'querystring';


interface Oferta {
  id: number;
  name: string;
  cantidad: number;
  uom: number;
  price: number;
}

@Component({
  selector: 'app-enviadas',
  templateUrl: './enviadas.page.html',
  styleUrls: ['./enviadas.page.scss'],
})

export class EnviadasPage implements OnInit {
  private database: SQLiteObject;
  searchTerms: string;

  grouped = new Map();
  items: Oferta[] = [];

  constructor(    private sqlite: SQLite
    ) { this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.database = db; 
    
        db.executeSql('SELECT * FROM items', [])
          .then((data =>{
            console.log(data);
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              this.items.push(data.rows.item(i));
              console.log( this.items);
            }
          }}
          ))
    
    
      })
      .catch(e => console.log(e));}

  async ngOnInit() {

   }

}
