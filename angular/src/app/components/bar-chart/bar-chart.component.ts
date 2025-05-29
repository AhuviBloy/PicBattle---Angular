import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ChallengeService } from '../../shared/services/challenge/challenge.service';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule, MatSpinner],
})
export class BarChartComponent implements OnInit {
  loading: boolean = true;
  challenges: any[] = [];
  constructor(
    private challengeService: ChallengeService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  barChartSeries = [
    {
      name: 'Number of Creations',
      data: [] as number[],
    },
  ];

  barChart: ApexChart = {
    type: 'bar',
    height: 400,
    fontFamily: 'Rubik, sans-serif',
  };

  barChartXaxis: ApexXAxis = {
    categories: [],
    labels: {
      rotate: 0,
      style: { fontSize: '12px' },
    },
  };

  barChartYAxis: ApexYAxis = {
    title: { text: 'Number of Creations' },
  };

  barChartDataLabels: ApexDataLabels = {
    enabled: true,
  };

  barChartPlotOptions: ApexPlotOptions = {
    bar: {
      borderRadius: 5,
      columnWidth: '50%',
      distributed: true,
    },
  };

  barChartTitle: ApexTitleSubtitle = {
    text: 'Number of Creations per Challenge',
    align: 'center',
    style: {
      fontSize: '24px',  // למשל 24 פיקסלים
      fontWeight: 'bold', // אופציונלי - להדגשה
      fontFamily: 'Rubik, sans-serif' // לשמור על הפונט שלך
    }
  };
  

  barChartTooltip: ApexTooltip = {
    y: {
      formatter: (val) => `${val} creations`,
    },
  };

  ngOnInit(): void {
    this.loadChallenges();
  }

  private loadChallenges(): void {
    if (this.authService.isLoggedIn()) {
      this.challengeService.getAllChallenge().subscribe({
        next: (data: any[]) => {
          this.challenges = data;
          this.barChartXaxis.categories = this.challenges.map((c) => c.title);
          this.barChartSeries[0].data = this.challenges.map(
            (c) => c.countCreations
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching challenges:', error);
          alert('Error fetching challenges');
          this.loading = false;
        },
      });
    } else {
      this.loading = false;
    }
  }
}
