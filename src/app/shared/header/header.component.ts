import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Router, RouterModule } from '@angular/router';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  cardCount = 0;
  constructor(private router: Router, private cityService: CityService,) { }

  ngOnInit() {
    this.cityService.cardCount$.subscribe(count => {
      this.cardCount = count;
    });
  }
  

  goToAddLocation() {
    this.router.navigate(['/add-location']);
  }


}
