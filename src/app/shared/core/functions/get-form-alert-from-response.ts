import { HttpErrorResponse } from '@angular/common/http';
import { FormAlert, FormAlertType } from '../components/form-messages/form-alerts.component';

function hasApiErrorProperties(value: unknown): boolean {
  if (typeof value !== 'object' && value === null) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(value, 'status') &&
    typeof (value as { status: unknown }).status === 'number';
}

const errorCodeAlerts: Record<number, FormAlert> = {
  0: {
    message: 'GENERAL.ERROR.CONNECTION_REFUSED',
    type: FormAlertType.Error,
  },
  401: {
    message: 'GENERAL.ERROR.UNAUTHORIZED',
    type: FormAlertType.Warning,
  },
  500: {
    message: 'GENERAL.ERROR.INTERNAL_SERVER_ERROR',
    type: FormAlertType.Error,
  },
};

export function getFormAlertFromResponse(response: HttpErrorResponse): FormAlert {
  if (hasApiErrorProperties(response)) {
    return errorCodeAlerts[response.status];
  }

  return {
    message: 'GENERAL.ERROR.UNKNOWN_NETWORK_ERROR',
    type: FormAlertType.Error,
  };
}
