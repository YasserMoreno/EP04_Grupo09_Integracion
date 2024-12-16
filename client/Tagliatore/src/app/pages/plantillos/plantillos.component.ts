import { Component } from '@angular/core';
import { FooterComponent } from "../../components/footer/footer.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-plantillos',
  standalone: true,
  imports: [FooterComponent, SidebarComponent, HeaderComponent, RouterModule],
  templateUrl: './plantillos.component.html',
  styleUrl: './plantillos.component.css'
})
export class PlantillosComponent {

}
