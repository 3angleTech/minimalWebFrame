import { Injectable, ApplicationRef, Injector, ComponentRef, Type, ViewContainerRef } from '@angular/core';

/*
* DialogService is a service that allows you to dynamically open and close dialogs.
*/
@Injectable()
export class DialogService {
  private dialogComponentRef!: ComponentRef<any>;

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
  ) {
  }

  open(viewContainerRef: ViewContainerRef, component: Type<any>, componentProps?: any): ComponentRef<any> {
    this.dialogComponentRef = viewContainerRef.createComponent(component, {
      injector: this.injector,
    });

    this.dialogComponentRef.instance["configuration"] = componentProps;

    return this.dialogComponentRef;
  }

  close() {
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
    }
  }
}
