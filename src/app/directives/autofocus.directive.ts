import { AfterContentInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoFocusDirective]'
})
export class AutofocusDirective implements AfterContentInit {
  @Input() public appAutofocus: boolean;
  constructor(private elementRef: ElementRef) {}

  public ngAfterContentInit() {
    setTimeout(()=>{this.elementRef.nativeElement.focus()},500);
  }
}
