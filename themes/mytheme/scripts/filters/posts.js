const cheerio = require('cheerio')

hexo.extend.filter.register('after_post_render', function(data) {
  const $ = cheerio.load(`<div id="root">${data.content}</div>`, { decodeEntities: false })

  $('#root > p').each((index, item) => {
    $(item).addClass('md-p')
  })

  $('#root > h2').each((index, item) => {
    $(item).addClass('md-h2')
    $('a', item).removeClass().addClass('md-title-hook icon ion-md-link')
  })

  $('#root > ul').each((index, item) => {
    $(item).addClass('md-list')
    $('li', item).addClass('md-list-item').prepend('<i class="md-list-icon icon ion-md-checkbox"></i>')
  })

  data.content = $('#root').html()
  return data
}, 10)
