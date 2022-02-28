import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSelectableComponent } from '@ionic-selectable/angular';
import { Storage, StoragePlugin } from '@capacitor/storage';
import { NgForm, FormGroup, FormControl, FormBuilder} from '@angular/forms';

interface Oferta {
  id: number;
  name: string;
  cantidad: number;
  uom: number;
  price: number;
}
class Port {
  public id: number;
  public name: string;
}

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {
  users = [
		{
			id: 0,
			name: "Simon Grimm",
			country: "Germany",
		},
		{
			id: 1,
			name: "Max Lynch",
			country: "Wisconsin",
		}]

  ofertas: Oferta[] = [];
  itemsO: Oferta[] = [];
  tempVariable: boolean = false;
  public items: any[];
  public itemsF: any[];
  selectedValue;
  public nameType: string = "";
  searchTerms: string;

	@ViewChild("selectComponent") selectComponent: IonicSelectableComponent;
	toggle = true;
	group = null;
	selected = [];
	selectedUsers = null;
  constructor() {         
}


userChanged(event: { component: IonicSelectableComponent; value: any }) {
  console.log("Selected: ", event);
}
openFromCode() {
  this.selectComponent.open();
}

clear() {
  this.selectComponent.clear();
  this.selectComponent.close();
}

toggleItems() {
  this.selectComponent.toggleItems(this.toggle);
  this.toggle = !this.toggle;
}

confirm() {
  this.selectComponent.confirm();
  this.selectComponent.close();
}


  async ngOnInit() {
    const i = await Storage.get({ key: 'products' });
    this.items = JSON.parse(i.value.toString());
    this.itemsF =this.items['data'].filter(i => i !== null);

    console.log(this.itemsF)

    const i1 = await Storage.get({ key: 'oferta' });
    this.itemsO = JSON.parse(i1.value.toString());
    this.itemsO =this.itemsO.filter(i => i !== null);
    console.log(this.itemsO);

    for(var i3 = 0; i3 < this.itemsO.length ; i3++){
    this.ofertas.push(this.itemsO[i3]);
    }
  }

  async register(data:NgForm){
    //let pro =data.value.nameType.split('-');
    this.ofertas.push({id:this.nameType['id'], name:this.nameType['name'], cantidad:data.value.cantidad, uom:this.nameType['uom_id'][0], price:this.nameType['lst_price']});
    
    const removeName = async () => {
      await Storage.remove({ key: 'oferta' });
    };

    await Storage.set({
      key: 'oferta',
      value: JSON.stringify(this.ofertas)
    })

    console.log(this.itemsO);

  }

  async eliminarItem(item: Oferta) {
    const removeName = async () => {
      await Storage.remove({ key: 'oferta' });
    };
    console.log("Start");
    
    const indiceABorrar = this.ofertas.findIndex((i: Oferta) => {
        return (i.id === item.id);
    });
    if (-1 != indiceABorrar) {
        this.ofertas.splice(indiceABorrar, 1);
        console.log("borrado con exito");
    }
    await Storage.set({
      key: 'oferta',
      value: JSON.stringify(this.ofertas)
    })
    console.log(this.ofertas);
}
  compareWith(o1: Oferta, o2: Oferta | Oferta[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: Oferta) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }



}


  


