import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IntranetComponent } from './pages/intranet/intranet.component';
import { PlatillosComponent } from './pages/platillos/platillos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { OrdenesComponent } from './pages/ordenes/ordenes.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { MeserosComponent } from './pages/meseros/meseros.component';
import { AgregarPlatilloComponent } from './pages/agregar-platillo/agregar-platillo.component';
import { AgregarClienteComponent } from './pages/agregar-cliente/agregar-cliente.component';
import { AgregarOrdenComponent } from './pages/agregar-orden/agregar-orden.component';
import { AgregarCategoriaComponent } from './pages/agregar-categoria/agregar-categoria.component';
import { AgregarMeseroComponent } from './pages/agregar-mesero/agregar-mesero.component';
import { ChatComponent } from './chat/chat.component';
import { VistaChatComponent } from './pages/vista-chat/vista-chat.component';
import { VistaClienteComponent } from './pages/vista-cliente/vista-cliente.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'intranet',
    component: IntranetComponent,
  },
  {
    path: 'platillos',
    component: PlatillosComponent,
  },
  {
    path: 'agregar-platillo',
    component: AgregarPlatilloComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'agregar-cliente',
    component: AgregarClienteComponent,
  },
  {
    path: 'ordenes',
    component: OrdenesComponent,
  },
  {
    path: 'agregar-orden',
    component: AgregarOrdenComponent,
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
  },
  {
    path: 'agregar-categoria',
    component: AgregarCategoriaComponent,
  },
  {
    path: 'meseros',
    component: MeserosComponent,
  },
  {
    path: 'agregar-mesero',
    component: AgregarMeseroComponent,
  },
  {
    path: 'vista-chat',
    component: VistaChatComponent,
  },
  {
    path: 'vista-cliente',
    component: VistaClienteComponent,
  },
  { 
    path: 'chat', 
    component: ChatComponent 
  }
];
