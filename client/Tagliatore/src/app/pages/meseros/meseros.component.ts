import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-meseros',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './meseros.component.html',
  styleUrl: './meseros.component.css'
})
export class MeserosComponent {

}
