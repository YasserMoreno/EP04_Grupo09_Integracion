import { Component, AfterViewChecked, Inject, PLATFORM_ID, ViewChild, ElementRef, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import ApexCharts from 'apexcharts';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterModule } from '@angular/router';
import { PlatillosService } from '../../services/platilloService/platillo.service';
import { Categoria } from '../../interfaces/categoria';
import { Platillo } from '../../interfaces/platillo';

@Component({
  selector: 'app-intranet',
  standalone: true,
  imports: [SidebarComponent, CommonModule, HeaderComponent, FooterComponent, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.css']
})
export class IntranetComponent implements AfterViewChecked {

  platilloData: Platillo[] = [];
  categoriaData: Categoria | null = null;
  isLoading = true;

  @ViewChild('trafficOverview') trafficOverview!: ElementRef;
  private chart: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef,
    private platilloService: PlatillosService
  ) {}

  ngOnInit(): void {
    this.getPlatillos();
  }

  ngAfterViewChecked(): void {
    if (this.trafficOverview && this.trafficOverview.nativeElement && this.isLoading) {
      this.loadChart();
      this.isLoading = false;
    }
  }

  loadChart(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('apexcharts').then(ApexChartsModule => {
        const ApexCharts = ApexChartsModule.default;

        if (ApexCharts && typeof ApexCharts === 'function') {
          this.dashboardScript(ApexCharts);
        } else {
          console.error('ApexCharts no es una función válida');
        }
      }).catch(error => {
        console.error('Error loading ApexCharts:', error);
      });
    }
  }

  dashboardScript(ApexCharts: any): void {
    try {
      const chartOptions = {
        series: [
          {
            name: "Nuevas Ordenes",
            data: [5, 1, 17, 6, 15, 9, 6],
          },
          {
            name: "Ordenes",
            data: [7, 11, 4, 16, 10, 14, 10],
          },
        ],
        chart: {
          toolbar: { show: false },
          type: "line",
          fontFamily: "inherit",
          foreColor: "#adb0bb",
          height: 320,
          stacked: false,
        },
        colors: ["var(--bs-gray-300)", "var(--bs-primary)"],
        dataLabels: { enabled: false },
        legend: { show: false },
        stroke: { width: 2, curve: "smooth", dashArray: [8, 0] },
        grid: { borderColor: "rgba(0,0,0,0.1)", strokeDashArray: 3, xaxis: { lines: { show: false } } },
        xaxis: {
          axisBorder: { show: false },
          axisTicks: { show: false },
          categories: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"], // Categorías explícitas.
        },
        yaxis: { tickAmount: 4 },
        markers: { strokeColor: ["var(--bs-gray-300)", "var(--bs-primary)"], strokeWidth: 2 },
        tooltip: { theme: "dark" },
      };

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new ApexCharts(this.trafficOverview.nativeElement, chartOptions);
      this.chart.render();

      this.cdRef.detectChanges();
    } catch (error) {
      console.error("Error al renderizar el gráfico de ApexCharts:", error);
    }
  }

  getPlatillos(): void {
    console.log("Solicitando todos los platillos...");

    this.platilloService.getPlatillos().subscribe({
      next: (response) => {
        console.log('Platillos obtenidos:', response);
        this.platilloData = response;

        if (response.length > 0) {
          this.categoriaData = response[0].categoriaId || null;
        }
      },
      error: (err: any) => {
        console.error('Error al obtener los platillos:', err);
      }
    });
  }
}
