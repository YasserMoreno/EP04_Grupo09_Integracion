import { Component, AfterViewInit, Inject, PLATFORM_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Verifica si estamos en el navegador antes de ejecutar la lógica
    if (isPlatformBrowser(this.platformId)) {
      this.setActiveLink();
    }
  }

  setActiveLink() {
    if (isPlatformBrowser(this.platformId)) {
      const url = window.location.href;
      const path = url.replace(window.location.protocol + "//" + window.location.host + "/", "");

      // Encuentra el link activo
      document.querySelectorAll("ul#sidebarnav a").forEach((link: any) => {
        if (link.href === url || link.href === path) {
          link.classList.add("active");
          this.setParentsActive(link);
        }
      });

      // Agregar listeners a los enlaces
      const menuLinks = document.querySelectorAll("#sidebarnav a");
      menuLinks.forEach((link: any) => {
        link.addEventListener("click", (e: Event) => this.onLinkClick(e, link));
      });
    }
  }

  setParentsActive(link: any) {
    let parent = link.parentElement;

    while (parent && !parent.matches("ul")) {
      if (parent.matches("li")) {
        parent.classList.add("active");
        if (parent.querySelector("ul#sidebarnav")) {
          parent.classList.add("selected");
        }
      }
      parent = parent.parentElement;
    }
  }

  onLinkClick(event: Event, link: any) {
    event.preventDefault();
    if (!link.classList.contains("active")) {
      this.closeOpenMenus();
      link.classList.add("active");
      const nextUl = link.nextElementSibling;
      if (nextUl && nextUl.tagName === 'UL') {
        nextUl.classList.add("in");
      }
    } else {
      link.classList.remove("active");
      const nextUl = link.nextElementSibling;
      if (nextUl && nextUl.tagName === 'UL') {
        nextUl.classList.remove("in");
      }
    }
  }

  closeOpenMenus() {
    const openMenus = document.querySelectorAll("ul.in");
    openMenus.forEach((menu: any) => {
      menu.classList.remove("in");
    });

    const activeLinks = document.querySelectorAll("a.active");
    activeLinks.forEach((link: any) => {
      link.classList.remove("active");
    });
  }
}
