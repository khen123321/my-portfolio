const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()
const PLACEHOLDER_MEASUREMENT_ID = 'G-XXXXXXXXXX'

let hasStarted = false
let lastTrackedLocation = ''

function canUseAnalytics() {
  return (
    import.meta.env.PROD &&
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    Boolean(GA_MEASUREMENT_ID) &&
    GA_MEASUREMENT_ID !== PLACEHOLDER_MEASUREMENT_ID
  )
}

function setupGtagQueue() {
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments)
    }
}

function loadGtagScript() {
  const scriptId = 'google-analytics-gtag'

  if (document.getElementById(scriptId)) return

  const script = document.createElement('script')
  script.id = scriptId
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    GA_MEASUREMENT_ID,
  )}`

  document.head.appendChild(script)
}

function currentPageLocation() {
  return window.location.href
}

function trackPageView() {
  if (!canUseAnalytics() || typeof window.gtag !== 'function') return

  const pageLocation = currentPageLocation()

  if (pageLocation === lastTrackedLocation) return

  const pageReferrer = lastTrackedLocation || document.referrer

  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: pageLocation,
    page_referrer: pageReferrer,
  })

  lastTrackedLocation = pageLocation
}

function trackNavigationChange() {
  window.setTimeout(trackPageView, 0)
}

function watchNavigationChanges() {
  window.addEventListener('hashchange', trackNavigationChange)
  window.addEventListener('popstate', trackNavigationChange)

  const wrapHistoryMethod = (methodName) => {
    const originalMethod = window.history[methodName]

    if (typeof originalMethod !== 'function') return

    window.history[methodName] = function historyMethod(...args) {
      const result = originalMethod.apply(this, args)
      trackNavigationChange()
      return result
    }
  }

  wrapHistoryMethod('pushState')
  wrapHistoryMethod('replaceState')
}

export function startAnalytics() {
  if (!canUseAnalytics() || hasStarted) return

  hasStarted = true

  setupGtagQueue()
  loadGtagScript()

  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  })

  trackPageView()
  watchNavigationChanges()
}
