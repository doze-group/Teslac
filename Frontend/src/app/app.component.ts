import { Component, OnInit } from '@angular/core';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  Book: any = faBookReader;

  ngOnInit(): void {
    window.onbeforeunload = function () {
      localStorage.removeItem('Moment');
    };
  }

}
