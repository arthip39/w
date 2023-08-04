import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-summary',
  templateUrl: './team-summary.component.html',
})
export class TeamSummaryComponent implements OnInit {

  public series: number[] = [44, 55, 41, 17, 15];
  public chart: any = {
    type: 'donut',
    height: 350,
    width: '100%',
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true
            }
          }
        }
      }
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries', 'Grapes'],
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    legend: {
      show: true,
      position: 'bottom',
    },
    
    
  };

  constructor() {}

  ngOnInit(): void {
  }
}
