import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  user!: string | undefined;
  redirectProductLink!: string;

  constructor(private storeService: Store<State>) { }

  ngOnInit(): void {
    this.storeService
      .subscribe(state => {
        this.user = state.app.user?.firstname;
    });
  }

  getRandomProduct() {
    this.redirectProductLink = '/product/' + (Math.floor(Math.random() * 20) + 1);
  }

}
