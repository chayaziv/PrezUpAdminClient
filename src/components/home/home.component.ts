import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar'; // עבור mat-toolbar
import { MatIconModule } from '@angular/material/icon'; // עבור mat-icon
import { MatButtonModule } from '@angular/material/button'; // עבור mat-button
import { MatCardModule } from '@angular/material/card'; // עבור mat-card
import { MatMenuModule } from '@angular/material/menu'; // עבור mat-menu
import { MatTooltipModule } from '@angular/material/tooltip'; // עבור טיפים בעכבר אם נדרש
@Component({
  selector: 'app-home',
  imports: [
    MatToolbarModule,         // מודול עבור mat-toolbar
    MatIconModule,            // מודול עבור mat-icon
    MatButtonModule,          // מודול עבור mat-button
    MatCardModule,            // מודול עבור mat-card
    MatMenuModule,            // מודול עבור mat-menu
    MatTooltipModule    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
