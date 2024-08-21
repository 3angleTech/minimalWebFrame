import { NgModule } from '@angular/core';
import { TypographyPageComponent } from './pages/typography/typography-page.component';
import { RouterModule } from '@angular/router';
import { DialogsPageComponent } from './pages/dialogs/dialogs-page.component';

const sandboxRoutes = [
  {
    path: 'dialogs',
    component: DialogsPageComponent,
  },
  {
    path: 'typography',
    component: TypographyPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(sandboxRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class SandboxFeatureRoutingModule {
};
