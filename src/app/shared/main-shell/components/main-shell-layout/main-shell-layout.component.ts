import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgressBarComponent } from '~shared/core';
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-main-shell-layout',
  styleUrls: ['./main-shell-layout.component.scss'],
  templateUrl: './main-shell-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // eslint-disable-next-line @angular-eslint/use-component-view-encapsulation
  encapsulation: ViewEncapsulation.None,
  imports: [RouterOutlet, NavigationMenuComponent, ProgressBarComponent, AsyncPipe],
})
export class MainShellLayoutComponent implements OnDestroy, OnInit {
  public readonly routeIsLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  private routerEventsSubscription: Subscription | undefined;

  private readonly router = inject(Router);

  public ngOnInit(): void {
    this.routerEventsSubscription = this.router.events.subscribe((routerEvent: Event): void => {
      this.handleRouterEvent(routerEvent);
    });
  }

  private handleRouterEvent(routerEvent: Event): void {
    if (this.navigationHasStarted(routerEvent)) {
      // Display the progress bar while loading and resolving routes.
      requestAnimationFrame((): void => {
        this.routeIsLoading.emit(true);
      });
    }

    if (this.navigationHasFinished(routerEvent)) {
      // Stop the loading animation before the next repaint.
      requestAnimationFrame((): void => {
        this.routeIsLoading.emit(false);
      });
    }
  }

  public ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  private navigationHasStarted(routerEvent: Event): routerEvent is NavigationStart {
    return routerEvent instanceof NavigationStart;
  }

  private navigationHasFinished(routerEvent: Event): routerEvent is NavigationEnd | NavigationCancel | NavigationError {
    return routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError;
  }
}
