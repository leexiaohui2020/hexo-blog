import { setCss, listenResize } from '../_libs/dom'
import { createBScroll } from '../_libs/utils'

window.addEventListener('load', () => {
  const nav = document.querySelector('.nav')
  const bsCard = document.querySelector('.bscard')
  const navBScroll = createBScroll(nav)

  listenResize({
    pc() {
      const rect = bsCard.getBoundingClientRect()
      setCss(nav, 'height', `calc(100vh - ${rect.height + 12}px)`)
      navBScroll.refresh()
    },

    mobile() {
      setCss(nav, 'height', null)
      navBScroll.refresh()
    }
  }, true)
})
