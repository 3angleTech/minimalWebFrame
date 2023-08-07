import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default-shell',
  styleUrls: ['./default-shell.component.scss'],
  templateUrl: './default-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DefaultShellComponent implements OnDestroy, OnInit {
  public readonly routeIsLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
  private routerEventsSubscription: Subscription | undefined;

  constructor(
    private readonly router: Router,
  ) {}

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
