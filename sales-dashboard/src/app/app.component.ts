import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ToolbarService, ToolbarOptions } from 'src/services/toolbar.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { PersonProvider } from 'src/providers/person.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @ViewChild('sidenav') sidenav: MatSidenav;

  showNavbar = false;

  title = '';

  mode = 'side';
  opened: boolean = true;
  
  constructor(
    private authenticationService: AuthenticationService,
    private personProvider: PersonProvider,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit() {
    this.toolbarService.options.subscribe(options => {
      if(options) this.title = options.title;
    });
    
    this.authenticationService.isAuthenticated.subscribe(isAuthenticated => {
      if(isAuthenticated) {
        this.personProvider.get('me').subscribe(me => {
          if(me) this.showNavbar = true;
        });
      } else this.showNavbar = false;
    });

    if (window.innerWidth < 800) {
      this.mode = 'over';
      this.opened = false;
    }
    if (window.innerWidth > 800) {
      this.mode = 'side';
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      if (this.sidenav && event.target.innerWidth < 800) {
        this.mode = 'over';
        this.sidenav.close();
        this.opened = false;
      }
      if (this.sidenav && event.target.innerWidth > 800) {
        this.mode = 'side';
        this.sidenav.open();
        this.opened = true;
      }
  }
}
