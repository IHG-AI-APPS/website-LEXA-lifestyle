'use client'

import { useEffect, useCallback, useRef } from 'react'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Generate or retrieve session ID
const getSessionId = () => {
  if (typeof window === 'undefined') return null
  let sessionId = sessionStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
    sessionStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

// Track page view
export const trackPageView = async (pageUrl?: string, pageTitle?: string) => {
  try {
    await fetch(`${API_URL}/api/analytics/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page_url: pageUrl || (typeof window !== 'undefined' ? window.location.pathname : ''),
        page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        session_id: getSessionId(),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        screen_width: typeof window !== 'undefined' ? window.innerWidth : null,
        screen_height: typeof window !== 'undefined' ? window.innerHeight : null
      })
    })
  } catch (error) {
    console.debug('Analytics pageview error:', error)
  }
}

// Track form submission
export const trackFormSubmission = async (
  formType: string,
  formName?: string,
  success: boolean = true,
  metadata?: Record<string, any>
) => {
  try {
    await fetch(`${API_URL}/api/analytics/form-submission`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form_type: formType,
        form_name: formName,
        page_url: typeof window !== 'undefined' ? window.location.pathname : '',
        session_id: getSessionId(),
        success,
        metadata
      })
    })
  } catch (error) {
    console.debug('Analytics form submission error:', error)
  }
}

// Track calculator events
export const trackCalculatorEvent = async (
  eventType: 'start' | 'step_complete' | 'submit' | 'pdf_download',
  step?: number,
  projectType?: string,
  totalCost?: number,
  metadata?: Record<string, any>
) => {
  try {
    await fetch(`${API_URL}/api/analytics/calculator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        step,
        session_id: getSessionId(),
        project_type: projectType,
        total_cost: totalCost,
        metadata
      })
    })
  } catch (error) {
    console.debug('Analytics calculator error:', error)
  }
}

// Track button clicks
export const trackButtonClick = async (buttonId: string, buttonText?: string) => {
  try {
    await fetch(`${API_URL}/api/analytics/button-click`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        button_id: buttonId,
        button_text: buttonText,
        page_url: typeof window !== 'undefined' ? window.location.pathname : '',
        session_id: getSessionId()
      })
    })
  } catch (error) {
    console.debug('Analytics button click error:', error)
  }
}

// React hook for automatic page view tracking
export function useAnalytics() {
  const tracked = useRef(false)
  
  useEffect(() => {
    // Only track once per page load
    if (!tracked.current) {
      tracked.current = true
      trackPageView()
    }
  }, [])
  
  return {
    trackPageView,
    trackFormSubmission,
    trackCalculatorEvent,
    trackButtonClick
  }
}

export default useAnalytics
