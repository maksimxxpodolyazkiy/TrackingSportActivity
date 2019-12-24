import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown-form-control',
  templateUrl: './dropdown-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownFormControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownFormControlComponent implements ControlValueAccessor {
  @Input() public values: Array<{ name: string; value: any }>;
  public selectedItem: string;
  public onChange: (val: any) => void;
  public onTouched: () => void;

  public writeValue(value: any): void {
    this.selectedItem = value;
  }

  public onDropdownChange(value: { name: string; value: any }): void {
    if (value) {
      this.onChange(value.value);
      this.selectedItem = value.name;
    } else {
      return;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
