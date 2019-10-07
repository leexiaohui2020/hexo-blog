import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'

BScroll.use(ScrollBar)
BScroll.use(MouseWheel)

/** @param {String} str */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function createBScroll(el) {
  const bs = new BScroll(el, {
    click: true,
    probeType: 3,
    bounce: {
      top: false,
      bottom: false
    },
    mouseWheel: {
      speed: 20,
      invert: false,
      easeTime: 300
    },
    scrollbar: true
  })
  const onResize = () => {
    bs.refresh()
  }

  window.addEventListener('resize', onResize)
  window.addEventListener('orientationchange', onResize)
  return bs
}

export function cacheFunc(fn) {
  const cache = {}
  return function(str) {
    if (str in cache) return cache[str]
    return cache[str] = fn(str)
  }
}