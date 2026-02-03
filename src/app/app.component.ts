import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  private readonly iconLibrary = inject(FaIconLibrary);
  private readonly translateService = inject(TranslateService);

  constructor() {
    this.iconLibrary.addIconPacks(fas, far);
    this.translateService.setFallbackLang('en');
    this.translateService.use('en');
  }
}
