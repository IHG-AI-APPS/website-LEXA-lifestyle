/**
 * Error Tracking and Monitoring
 * Centralized error handling for production monitoring
 */

interface ErrorLog {
  message: string
  stack?: string
  context?: Record<string, any>
  timestamp: Date
  url?: string
  userAgent?: string
}

class ErrorTracker {
  private errors: ErrorLog[] = []
  private maxErrors = 100

  log(error: Error | string, context?: Record<string, any>) {
    const errorLog: ErrorLog = {
      message: typeof error === 'string' ? error : error.message,
      stack: typeof error !== 'string' ? error.stack : undefined,
      context,
      timestamp: new Date(),
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
    }

    this.errors.push(errorLog)

    // Keep only last maxErrors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[Error Tracker]', errorLog)
    }

    // Send to external service (Sentry, LogRocket, etc.)
    this.sendToService(errorLog)
  }

  private async sendToService(errorLog: ErrorLog) {
    // TODO: Integrate with error tracking service (Sentry, LogRocket, etc.)
    // Example for Sentry:
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(new Error(errorLog.message), {
    //     contexts: {
    //       custom: errorLog.context,
    //     },
    //   })
    // }

    // For now, send to backend API
    try {
      if (process.env.NODE_ENV === 'production') {
        await fetch('/api/log-error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorLog),
        }).catch(() => {
          // Silently fail if logging endpoint is unavailable
        })
      }
    } catch {
      // Silently fail
    }
  }

  getErrors() {
    return this.errors
  }

  clearErrors() {
    this.errors = []
  }
}

export const errorTracker = new ErrorTracker()

// Helper functions
export const logError = (error: Error | string, context?: Record<string, any>) => {
  errorTracker.log(error, context)
}

export const logApiError = (endpoint: string, error: any, response?: Response) => {
  errorTracker.log(error, {
    type: 'api_error',
    endpoint,
    status: response?.status,
    statusText: response?.statusText,
  })
}

export const logComponentError = (componentName: string, error: Error) => {
  errorTracker.log(error, {
    type: 'component_error',
    component: componentName,
  })
}
