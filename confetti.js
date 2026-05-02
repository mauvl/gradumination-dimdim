function launchConfetti() {

  for(let i = 0; i < 120; i++) {

    const confetti = document.createElement('div')

    confetti.innerHTML = '🎉'

    confetti.style.position = 'fixed'
    confetti.style.left = Math.random() * 100 + 'vw'
    confetti.style.top = '-20px'
    confetti.style.fontSize = Math.random() * 25 + 15 + 'px'
    confetti.style.zIndex = '9999'
    confetti.style.pointerEvents = 'none'

    document.body.appendChild(confetti)

    const duration = Math.random() * 3 + 2

    confetti.animate([
      {
        transform: 'translateY(0px) rotate(0deg)'
      },
      {
        transform: `translateY(110vh) rotate(${Math.random() * 720}deg)`
      }
    ], {
      duration: duration * 1000,
      easing: 'linear'
    })

    setTimeout(() => {
      confetti.remove()
    }, duration * 1000)

  }

}