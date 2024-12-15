import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IntranetComponent } from './pages/intranet/intranet.component';
import { PlantillosComponent } from './pages/plantillos/plantillos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { OrdenesComponent } from './pages/ordenes/ordenes.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MeserosComponent } from './pages/meseros/meseros.component';

export const routes: Routes = [

    {
        path:"",
        component: HomeComponent
    },
    {
        path:"home",
        component: HomeComponent
    },
    {
        path:"intranet",
        component: IntranetComponent
    },
    {
        path:"platillos",
        component: PlantillosComponent
    },
    {
        path:"clientes",
        component: ClientesComponent
    },
    {
        path: "ordenes",
        component: OrdenesComponent
    },
    {
        path: "categorias",
        component: CategoriasComponent
    },
    {
        path: "meseros",
        component: MeserosComponent
    }

];
