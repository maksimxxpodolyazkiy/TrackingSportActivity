import { Component, OnInit, Input } from "@angular/core";
import Chart from "chart.js";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  public canvas: any;
  public ctx;
  public data: any;
  public myChartData;
  // @Input() public fbRepeats: string[];
  @Input() set fbRepeats(value) {
    this.configureChart(value);
  }

  public configureChart(value) {
    const gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(145, 213, 255, 0.1)",
              zeroLineColor: "transparent"
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(145, 213, 255, 0.5)",
              zeroLineColor: "transparent"
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a"
            }
          }
        ]
      }
    };

    const chart_labels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    this.data = value;
    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");

    const gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(64, 169, 255, 0.2)");
    gradientStroke.addColorStop(0.4, "rgba(64, 169, 255, 0.0)");
    gradientStroke.addColorStop(0, "rgba(64, 169, 255, 0)");

    const config = {
      type: "line",
      data: {
        labels: chart_labels,
        datasets: [
          {
            label: "Repeats",
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: "rgba(64, 169, 255, 0.9)",
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: "rgba(64, 169, 255, 1)",
            pointBorderColor: "rgba(255,255,255,0)",
            pointHoverBackgroundColor: "#ec250d",
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.data
          }
        ]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
    };

    this.myChartData = new Chart(this.ctx, config);
  }
}
