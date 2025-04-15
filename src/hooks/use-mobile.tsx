
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Helper function to check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Set initial value
    checkIfMobile()
    
    // Add event listeners for resize and orientation change
    window.addEventListener("resize", checkIfMobile)
    window.addEventListener("orientationchange", checkIfMobile)
    
    // Media query listener for more responsive updates
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const handleMqlChange = () => checkIfMobile()
    
    // Use the right event based on browser support
    if (mql.addEventListener) {
      mql.addEventListener("change", handleMqlChange)
    } else {
      // For older browsers
      mql.addListener(handleMqlChange)
    }
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
      window.removeEventListener("orientationchange", checkIfMobile)
      
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleMqlChange)
      } else {
        // For older browsers
        mql.removeListener(handleMqlChange)
      }
    }
  }, [])

  return !!isMobile
}

// Add a hook to detect viewport height changes (for handling mobile browser address bar)
export function useViewportHeight() {
  React.useEffect(() => {
    // Set viewport height variable that adjusts for mobile browsers
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }
    
    setViewportHeight()
    
    window.addEventListener("resize", setViewportHeight)
    window.addEventListener("orientationchange", setViewportHeight)
    
    return () => {
      window.removeEventListener("resize", setViewportHeight)
      window.removeEventListener("orientationchange", setViewportHeight)
    }
  }, [])
}
