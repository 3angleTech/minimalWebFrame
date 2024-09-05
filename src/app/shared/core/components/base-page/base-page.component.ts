import { Component, HostBinding } from "@angular/core";


@Component({
  selector: 'app-base-page',
  template: '<ng-content></ng-content>'
})
export abstract class BasePageComponent {
  @HostBinding('class.page') isClassActive = true;
}
