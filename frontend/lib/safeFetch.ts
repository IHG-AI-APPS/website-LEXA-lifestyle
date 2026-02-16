/**
 * Safari-compatible fetch utility
 * Handles caching issues and provides consistent error handling
 */

export interface FetchOptions extends RequestInit {
  timeout?: number
}

export interface FetchResult<T> {
  data: T | null
  error: string | null
  loading: boolean
}

/**
 * Safari-compatible fetch with cache busting and timeout
 */
export async function safeFetch<T>(
  url: string, 
  options: FetchOptions = {}
): Promise<{ data: T | null; error: string | null }> {
  const { timeout = 15000, ...fetchOptions } = options
  
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        ...fetchOptions.headers,
      },
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      return { 
        data: null, 
        error: `Request failed: ${response.status} ${response.statusText}` 
      }
    }
    
    const data = await response.json()
    return { data, error: null }
  } catch (err) {
    clearTimeout(timeoutId)
    
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        return { data: null, error: 'Request timed out. Please try again.' }
      }
      return { data: null, error: err.message }
    }
    return { data: null, error: 'An unexpected error occurred' }
  }
}

/**
 * Safari-compatible POST fetch
 */
export async function safePost<T>(
  url: string,
  body: Record<string, unknown>,
  options: FetchOptions = {}
): Promise<{ data: T | null; error: string | null }> {
  return safeFetch<T>(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: JSON.stringify(body),
  })
}
