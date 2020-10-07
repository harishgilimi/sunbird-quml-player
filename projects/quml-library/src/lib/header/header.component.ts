import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'quml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() questions?: any;
  @Input() duration?: any;
  @Input() disablePreviousNavigation: boolean;
  @Input() totalNoOfQuestions: any;
  @Input() currentSlideIndex: any;
  @Output() nextSlideClicked = new EventEmitter<any>();
  @Output() prevSlideClicked = new EventEmitter<any>();
  @Output() durationEnds = new EventEmitter<any>();
  time: any;
  constructor() {
  }


  ngOnInit() {
    console.log('total no of questions', this.totalNoOfQuestions);
    if (this.duration) {
      this.timer();
    }
  }

  nextSlide() {
    this.nextSlideClicked.emit({ event: 'next clicked' });
  }

  prevSlide() {
    if (!this.disablePreviousNavigation) {
      this.prevSlideClicked.emit({ event: 'previous clicked' });
    }
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '100%';
    document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
    document.body.style.backgroundColor = 'white';
  }

  timer() {
    const durationInSec = this.duration / 1000;
    let min = ~~(durationInSec / 60);
    let sec = (durationInSec % 60);
    setInterval(() => {
      if (sec === -1) {
        sec = 59;
        min = min - 1;
      } else if (sec === -1) {
        min = min - 1;
        sec = 59;
      }
      if (min === -1) {
        this.durationEnds.emit(true);
        return false;
      }
      if (sec < 10) {
        this.time = min + ':' + '0' + sec--;
      } else {
        this.time = min + ':' + sec--;
      }
    }, 1000);
  }
}
