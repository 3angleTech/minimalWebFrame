import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { FormAlert, FormAlertType } from '../components/form-messages/form-alerts.component';

const errorCodeAlerts: Record<number, FormAlert> = {
  0: {
    message: 'SERVER_ERROR.GENERIC.CONNECTION_REFUSED',
    type: FormAlertType.Error,
  },
  400: {
    message: 'SERVER_ERROR.GENERIC.BAD_REQUEST',
    type: FormAlertType.Error,
  },
  401: {
    message: 'SERVER_ERROR.GENERIC.UNAUTHORIZED',
    type: FormAlertType.Error,
  },
  403: {
    message: 'SERVER_ERROR.GENERIC.FORBIDDEN',
    type: FormAlertType.Error,
  },
  404: {
    message: 'SERVER_ERROR.GENERIC.NOT_FOUND',
    type: FormAlertType.Error,
  },
  500: {
    message: 'SERVER_ERROR.GENERIC.INTERNAL_SERVER_ERROR',
    type: FormAlertType.Error,
  },
  501: {
    message: 'SERVER_ERROR.GENERIC.NOT_IMPLEMENTED',
    type: FormAlertType.Error,
  },
};

function isHttpErrorResponse(value: unknown): value is HttpErrorResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return value instanceof HttpErrorResponse &&
    Object.prototype.hasOwnProperty.call(value, 'status') &&
    typeof (value as { status: unknown }).status === 'number';
}

function isServerErrorMessage(message: unknown): message is string {
  return typeof message === 'string' ? /^SERVER_ERROR\.[A-Za-z0-9_.]+$/.test(message) : false;
}

/**
 * Extracts form alerts from an error response body.
 * @see HttpErrorResponse.error
 */
function getServerErrors(error: unknown): FormAlert[] {
  const serverErrors: FormAlert[] = [];
  if (typeof error !== 'object' || error === null) {
    return serverErrors;
  }
  if ('message' in error) {
    const messages: unknown[] = Array.isArray(error['message']) ? error['message'] : [error['message']];
    messages.forEach((message) => {
      if (isServerErrorMessage(message)) {
        serverErrors.push({
          message: message,
          type: FormAlertType.Error,
        });
      }
    });
  }
  return serverErrors;
}

export function getFormAlertsFromHttpErrorResponse(response: unknown): FormAlert[] {
  if (isHttpErrorResponse(response)) {
    if ((response.status as HttpStatusCode) === HttpStatusCode.BadRequest) {
      const serverErrors: FormAlert[] = getServerErrors(response.error);
      if (serverErrors.length) {
        return serverErrors;
      }
    }

    return [errorCodeAlerts[response.status as HttpStatusCode] || errorCodeAlerts[0]];
  }

  const unknownConnectionError: FormAlert = {
    message: 'SERVER_ERROR.GENERIC.UNKNOWN',
    type: FormAlertType.Error,
  };
  return [unknownConnectionError];
}
