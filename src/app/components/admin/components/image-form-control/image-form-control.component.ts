import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-form-control',
  templateUrl: './image-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageFormControlComponent),
      multi: true,
    },
  ],
})
export class ImageFormControlComponent implements ControlValueAccessor {
  public onChange: (val: string) => void;
  public onTouched: () => void;

  public writeValue(value: string): void {}

  public onImageChange(value: string): void {
    if (value) {
      this.onChange(value);
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
