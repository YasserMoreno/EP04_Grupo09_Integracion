import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-mesero',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, SidebarComponent, RouterModule],
  templateUrl: './agregar-mesero.component.html',
  styleUrl: './agregar-mesero.component.css'
})
export class AgregarMeseroComponent {

}
