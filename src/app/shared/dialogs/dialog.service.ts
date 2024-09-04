import { Injectable, ApplicationRef, Injector, ComponentRef, Type, ViewContainerRef } from '@angular/core';

/*
* DialogService is a service that allows you to dynamically open and close dialogs.
*/
@Injectable()
export class DialogService {
  constructor(
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
  ) {
  }

  open(viewContainerRef: ViewContainerRef, component: Type<any>, componentProps?: any): ComponentRef<any> {
    const dialogComponentRef = viewContainerRef.createComponent(component, {
      injector: this.injector,
    });

    dialogComponentRef.instance["configuration"] = componentProps;

    return dialogComponentRef;
  }

  close(dialogComponentRef: ComponentRef<any>) {
    this.appRef.detachView(dialogComponentRef.hostView);
    dialogComponentRef.destroy();
  }
}
