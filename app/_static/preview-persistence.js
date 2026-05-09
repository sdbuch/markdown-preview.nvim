(function () {
  function getAnchor(target) {
    if (!target || !target.closest) {
      return null
    }
    return target.closest('a[href]')
  }

  function isExternalUrl(url) {
    return (
      url.origin !== window.location.origin &&
      /^(https?:|mailto:|tel:)$/i.test(url.protocol)
    )
  }

  document.addEventListener('click', function (event) {
    var anchor = getAnchor(event.target)
    if (!anchor) {
      return
    }

    try {
      var url = new URL(anchor.getAttribute('href'), window.location.href)
      if (isExternalUrl(url)) {
        anchor.setAttribute('target', '_blank')
        anchor.setAttribute('rel', 'noopener noreferrer')
      }
    } catch (e) {
      // Keep the browser default for invalid or non-standard links.
    }
  }, true)

  window.addEventListener('pageshow', function (event) {
    if (event.persisted && window.socket && !window.socket.connected) {
      window.location.reload()
    }
  })
})()
