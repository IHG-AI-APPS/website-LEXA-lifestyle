'use client'

import { useEffect, useState } from 'react'

export default function GoogleTranslateWidget() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Check if already loaded
    if (isLoaded) return

    // Define init function
    ;(window as any).googleTranslateElementInit = function() {
      if ((window as any).google?.translate?.TranslateElement) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'ar,en',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        )
        setIsLoaded(true)
      }
    }

    // Load Google Translate script
    const script = document.createElement('script')
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    script.onerror = () => {
      console.warn('Google Translate failed to load')
    }
    document.head.appendChild(script)

    // Add custom styles to hide/improve Google Translate UI
    const style = document.createElement('style')
    style.textContent = `
      /* Hide the default Google Translate widget and make it cleaner */
      #google_translate_element {
        position: relative;
      }
      
      /* Hide Google Translate banner/frame */
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
      
      body {
        top: 0 !important;
      }
      
      /* Style the select dropdown */
      .goog-te-gadget {
        font-family: inherit !important;
        font-size: 0 !important;
      }
      
      .goog-te-gadget select {
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 13px;
        color: #1a1a1a;
        cursor: pointer;
        outline: none;
        font-family: inherit;
      }
      
      .goog-te-gadget select:hover {
        border-color: #1a1a1a;
      }
      
      /* Hide "Powered by" text */
      .goog-te-gadget .goog-te-gadget-simple {
        border: none !important;
        background: transparent !important;
        padding: 0 !important;
      }
      
      .goog-te-gadget .goog-te-gadget-simple .goog-te-menu-value {
        color: inherit !important;
      }
      
      .goog-te-gadget .goog-te-gadget-simple .goog-te-menu-value span {
        color: inherit !important;
      }
      
      /* Hide Google logo */
      .goog-te-gadget .goog-te-gadget-icon {
        display: none !important;
      }
      
      .goog-logo-link {
        display: none !important;
      }
      
      .goog-te-gadget-simple .goog-te-menu-value span:first-child {
        display: none;
      }
      
      /* Style for when language is selected */
      body.translated-ltr {
        margin-top: 0 !important;
      }
      
      #goog-gt-tt, .goog-te-balloon-frame {
        display: none !important;
      }
      
      .goog-text-highlight {
        background: none !important;
        box-shadow: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      // Cleanup if needed
      delete (window as any).googleTranslateElementInit
    }
  }, [isLoaded])

  return (
    <div 
      id="google_translate_element" 
      className="inline-block"
      suppressHydrationWarning
    />
  )
}
