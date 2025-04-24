import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from "../components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatInputModule, HeaderComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Angular';
}
