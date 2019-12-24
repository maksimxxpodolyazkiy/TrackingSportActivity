import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  public isOpened = false;
  @Input() public values: Array<{ name: string; value: any }>;
  @Input() public selectedItem: string;
  @Output() public getSelectedItem: EventEmitter<string> = new EventEmitter();

  public ngOnInit(): void {}

  public openDropdown(): void {
    this.isOpened = !this.isOpened;
  }

  public selectItem(value: any): void {
    this.getSelectedItem.emit(value);
    this.isOpened = false;
  }
}
