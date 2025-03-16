import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenueComponent } from '../components/menue/menue.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenueComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project-name';
}
