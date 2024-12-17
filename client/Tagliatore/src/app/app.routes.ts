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
import { EditarPlatilloComponent } from './pages/editar-platillo/editar-platillo.component';
import { EditarCategoriaComponent } from './pages/editar-categoria/editar-categoria.component';
import { EditarClienteComponent } from './pages/editar-cliente/editar-cliente.component';
import { EditarMeseroComponent } from './pages/editar-mesero/editar-mesero.component';
import { EditarOrdenComponent } from './pages/editar-orden/editar-orden.component';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard } from './guard/loginGuard/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'intranet',
    component: IntranetComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'platillos',
    component: PlatillosComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'agregar-platillo',
    component: AgregarPlatilloComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'editar-platillo/:id',
    component: EditarPlatilloComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'agregar-cliente',
    component: AgregarClienteComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'editar-cliente/:id',
    component: EditarClienteComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'ordenes',
    component: OrdenesComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'agregar-orden',
    component: AgregarOrdenComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'editar-orden/:id',
    component: EditarOrdenComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'agregar-categoria',
    component: AgregarCategoriaComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'editar-categoria/:id',
    component: EditarCategoriaComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'meseros',
    component: MeserosComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'agregar-mesero',
    component: AgregarMeseroComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'editar-mesero/:id',
    component: EditarMeseroComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'vista-chat',
    component: VistaChatComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'vista-cliente',
    component: VistaClienteComponent
  },
  { 
    path: 'chat', 
    component: ChatComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
