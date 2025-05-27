// // import { Component } from '@angular/core';
// // import { RouterModule } from '@angular/router';
// // import { MatSidenavModule } from '@angular/material/sidenav';
// // import { MatListModule } from '@angular/material/list';
// // import { MatIconModule } from '@angular/material/icon';
// // import { MatToolbarModule } from '@angular/material/toolbar';
// // import { MatButtonModule } from '@angular/material/button';
// // import { CommonModule } from '@angular/common';

// // @Component({
// //   selector: 'app-side-menu',
// //   standalone: true,
// //   imports: [
// //     CommonModule,
// //     RouterModule,
// //     MatSidenavModule,
// //     MatListModule,
// //     MatIconModule,
// //     MatToolbarModule,
// //     MatButtonModule
// //   ],
// //   templateUrl: './side-menu.component.html',
// //   styleUrls: ['./side-menu.component.css']
// // })
// // export class SideMenuComponent {
// //   isOpen = true;

// //   toggleSidenav() {
// //     this.isOpen = !this.isOpen;
// //   }
// // }


// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatListModule } from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../../services/auth/auth.service';

// @Component({
//   selector: 'app-side-menu',
//   standalone: true,
//   imports: [
//     CommonModule,
//     RouterModule,
//     MatSidenavModule,
//     MatListModule,
//     MatIconModule,
//     MatToolbarModule,
//     MatButtonModule
//   ],
//   templateUrl: './side-menu.component.html',
//   styleUrls: ['./side-menu.component.css']
// })
// export class SideMenuComponent {
//   isOpen = true;

//   constructor(private authService: AuthService) {}

//   toggleSidenav() {
//     this.isOpen = !this.isOpen;
//   }

//   logout() {
//     this.authService.logout();
//   }
// }




import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  isExpanded = false;
  isHovered = false;

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  logout() {
    this.authService.logout();
  }
}