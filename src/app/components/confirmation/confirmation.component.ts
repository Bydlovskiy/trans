import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  @Output() action = new EventEmitter();
  @Output() closeActionCard = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  actionClick():void {  
    this.action.emit()
  }

  actionCloseClick():void {
    this.closeActionCard.emit()
  }

}
