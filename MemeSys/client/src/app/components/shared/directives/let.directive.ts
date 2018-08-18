import {Directive, Input, TemplateRef, ViewContainerRef, Output} from '@angular/core';

interface LetContext<T> {
    let: T;
}

@Directive({
    selector: '[let]',
})
export class LetDirective {
  @Input()
  set let(context: any) {
    this.context.$implicit = this.context.let = context;
    this.updateView();
  }

  context: any = {};

  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}