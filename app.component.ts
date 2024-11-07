import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddComponent } from "./Employee/add/add.component";
import { ListComponent } from "./Employee/list/list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AddComponent, ListComponent, RouterLink],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularEmployeeRecord';
}
