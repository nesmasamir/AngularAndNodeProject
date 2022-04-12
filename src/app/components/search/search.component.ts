import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @Output() newItemEvent=new EventEmitter<string>();
  
  searchValue:string = '';

  // valueChanged: EventEmitter<string> = new EventEmitter<string>();

  onTextValueChanged() {
    this.newItemEvent.emit(this.searchValue);
  }
}
