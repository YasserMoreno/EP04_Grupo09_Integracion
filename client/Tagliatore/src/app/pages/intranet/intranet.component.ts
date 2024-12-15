import { Component, AfterViewChecked, Inject, PLATFORM_ID, ViewChild, ElementRef, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import ApexCharts from 'apexcharts';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-intranet',
  standalone: true,
  imports: [SidebarComponent, CommonModule, HeaderComponent, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.css']
})
export class IntranetComponent implements AfterViewChecked {
  isLoading = true;
  @ViewChild('trafficOverview') trafficOverview!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewChecked(): void {
    if (this.trafficOverview && this.trafficOverview.nativeElement) {
      if (this.isLoading) {
        this.loadChart();
      }
    }
  }

  loadChart(): void {
    if (isPlatformBrowser(this.platformId)) {
      // console.log('Antes de importar ApexCharts')
      import('apexcharts').then(ApexChartsModule => {
        // Acceder a la propiedad 'default' de ApexCharts al cargar dinámicamente
        const ApexCharts = ApexChartsModule.default;
        // console.log('ApexCharts loaded:', ApexCharts);  // Verificar que ApexCharts se cargó correctamente

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
            name: "New Users",
            data: [5, 1, 17, 6, 15, 9, 6],
          },
          {
            name: "Users",
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
        xaxis: { axisBorder: { show: false }, axisTicks: { show: false }, categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
        yaxis: { tickAmount: 4 },
        markers: { strokeColor: ["var(--bs-gray-300)", "var(--bs-primary)"], strokeWidth: 2 },
        tooltip: { theme: "dark" },
      };

      const chartElement = this.trafficOverview.nativeElement;
      const chart = new ApexCharts(chartElement, chartOptions);
      chart.render();

      this.cdRef.detectChanges();
      this.isLoading = false;
    } catch (error) {
      console.error("Error al renderizar el gráfico de ApexCharts:", error);
    }
  }
}
