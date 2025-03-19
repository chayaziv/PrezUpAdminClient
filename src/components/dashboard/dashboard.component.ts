import { Component, OnInit } from '@angular/core';
import { AdminDashboard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgxChartsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  dashboardData!: AdminDashboard;
  isLoading = true;
  errorMessage: string | null = null;

  usersPieData: any[] = [];
  rolesBarData: any[] = [];
  topUsersLineData: any[] = [];
  monthlyPresentationsBarData: any[] = [];
  monthlyPresentationsPieData: any[] = [];
  unusualActivityPieData: any[] = [];
  displayedColumns: string[] = ['userName', 'presentationCount'];
  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF5E3A', '#08DDC1'],
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data.data;
        this.processChartData();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load dashboard data.';
        this.isLoading = false;
      },
    });
  }
  xAxisTickFormatting = (value: any) => {
    // Map the value (ID) to the corresponding name
    const user = this.dashboardData.topUsers.find(
      (user) => user.userId === value
    );
    return user ? user.userName : value; // Display name instead of ID
  };

  processChartData(): void {
    this.usersPieData = [
      {
        name: 'Active Users',
        value: this.dashboardData.userStatistics.activeUsers,
      },
      {
        name: 'Inactive Users',
        value: this.dashboardData.userStatistics.inactiveUsers,
      },
    ];

    this.rolesBarData = this.dashboardData.rolesDistribution.map((role) => ({
      name: role.roleName,
      value: role.userCount,
    }));

    this.topUsersLineData = this.dashboardData.topUsers.map((user) => ({
      name: user.userName + ' ' + user.userId, // שם ישמר
      value: user.presentationCount,
    }));

    // this.monthlyPresentationsBarData =
    //   this.dashboardData.monthlyPresentations.map((mp) => ({
    //     name: `${mp.month}/${mp.year}`,
    //     value: mp.presentationCount,
    //   }));

    // this.monthlyPresentationsPieData = this.monthlyPresentationsBarData;

    // this.unusualActivityPieData = this.dashboardData.unusualActivities.map(
    //   (ua) => ({
    //     name: ua.userName,
    //     value: ua.presentationCount,
    //   })
    // );
  }
}
