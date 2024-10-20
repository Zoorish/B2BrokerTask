import {
  AfterViewChecked,
  Directive,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appColor]',
  standalone: true
})
export class ColorDirective implements AfterViewChecked{
  constructor(private element: ElementRef) {}

  ngAfterViewChecked() {
    this.checkColor(this.element.nativeElement.firstChild.data);
  }

  private checkColor(value: string): void {
    this.element.nativeElement.style.backgroundColor = value.toLowerCase();
  }
}
