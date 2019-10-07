import { setCss, listenResize } from '../_libs/dom'
import { createBScroll } from '../_libs/utils'

window.addEventListener('load', () => {
  const app = document.querySelector('.app')
  const appMain = document.querySelector('.app-main')
  const appSider = document.querySelector('.app-sider')
  const appScroll = document.querySelector('.app-scroll')
  const bsCard = document.querySelector('.bscard')
  const nav = document.querySelector('.nav')
  const navOpen = document.querySelector('#nav-open')
  const navCover = document.querySelector('.nav-cover')
  const navClose = document.querySelector('.nav-close')
  const appHeader = document.querySelector('.header')
  const appHeaderHeight = 50
  setCss(app, 'display', null)

  const appScrollBS = createBScroll(appScroll)
  const appOnScroll = (pos) => {
    const bsCardRect = bsCard.getBoundingClientRect()
    const height = Math.max(appHeaderHeight, bsCardRect.height + pos.y)
    setCss(appSider, 'maxHeight', `${height}px`)
    setCss(appMain, 'overflow', height <= 50 ? 'hidden' : null)
    setCss(appHeader, 'background', `rgba(34, 34, 34, ${Math.min(bsCardRect.height - appHeaderHeight, -pos.y) / (bsCardRect.height - appHeaderHeight)})`)
  }

  nav.addEventListener('animationend', () => {
    if (navCover.classList.contains('close')) {
      navCover.classList.remove('close')
      navCover.classList.remove('open')
    }
  })
  navOpen.addEventListener('click', () => navCover.classList.add('open'))
  navClose.addEventListener('click', () => navCover.classList.add('close'))

  listenResize({

    mobile() {
      const bsCardRect = bsCard.getBoundingClientRect()
      setCss(appScroll, 'height', `calc(100vh - ${bsCardRect.height}px)`)
      appScrollBS.refresh()
      appScrollBS.scrollTo(0, 0, 0)
      appScrollBS.on('scroll', appOnScroll)
    },

    pc() {
      setCss(appScroll, 'height', '100%')
      setCss(appSider, 'maxHeight', null)
      setCss(appMain, 'overflow', null)
      setCss(appHeader, 'background', null)
      appScrollBS.refresh()
      appScrollBS.off('scroll', appOnScroll)
    }
  }, true)
})
