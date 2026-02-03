import { Routes } from '@angular/router';
import { DialogsPageComponent } from './pages/dialogs/dialogs-page.component';
import { StylingGuidePageComponent } from './pages/styling-guide/styling-guide-page.component';

export default [
  {
    path: 'dialogs',
    component: DialogsPageComponent,
  },
  {
    path: 'styling-guide',
    component: StylingGuidePageComponent,
  },
] as Routes;
