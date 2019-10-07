import { capitalize, cacheFunc } from './utils'

const getStyleNames = cacheFunc(name => Object.keys(document.body.style).filter(key => {
  return name === key || RegExp(`^(webkit|moz|ms|o)${capitalize(name)}$`).test(key)
}));

export function setCss(el, name, value) {
  const styleNames = getStyleNames(name)
  styleNames.forEach(key => el.style[key] = value)
}

export function listenResize(listens, init) {
  const _onResize = () => {
    const rect = document.documentElement.getBoundingClientRect()
    if (rect.width <= 750 && typeof listens.mobile === 'function') {
      listens.mobile()
    } else if (rect.width > 750 && typeof listens.pc === 'function') {
      listens.pc()
    }
  }
  
  window.addEventListener('resize', _onResize)
  window.addEventListener('orientationchange', _onResize)

  if (init) {
    _onResize()
  }
}
