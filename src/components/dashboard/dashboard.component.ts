import { Component, OnInit } from '@angular/core';
import { AdminDashboard } from '../../models/dashboard.model';
import { DashboardService } from '../../services/dashboard.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  imports: [NgxChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  dashboardData!: AdminDashboard;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load dashboard data.';
        this.isLoading = false;
      },
    });
  }
}
