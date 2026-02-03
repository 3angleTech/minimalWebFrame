import { ComponentRef, Injectable, Injector, Type, ViewContainerRef, inject } from '@angular/core';

export interface IModalDialog<T = any> {
  configuration: T;
}

/*
* DialogService is a service that allows you to dynamically open and close dialogs.
*/
@Injectable({ providedIn: 'root' })
export class ModalDialogService {
  private readonly injector = inject(Injector);

  public open<T extends object>(
    viewContainerRef: ViewContainerRef,
    component: Type<T>,
    componentProps?: unknown,
  ): ComponentRef<T> {
    const dialogComponentRef = viewContainerRef.createComponent(component, {
      injector: this.injector,
    });

    const instance = dialogComponentRef.instance as unknown as IModalDialog;

    if (componentProps) {
      instance.configuration = componentProps;
    }

    return dialogComponentRef;
  }

  public close(dialogComponentRef: ComponentRef<unknown>): void {
    dialogComponentRef.destroy();
  }
}
