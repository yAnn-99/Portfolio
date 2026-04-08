import './style.css'

/* ─── CUSTOM CURSOR ───────────────────────────────────────── */
const cursor = document.getElementById('cursor')
const ring = document.getElementById('cursor-ring')
let mx = 0, my = 0, rx = 0, ry = 0

document.addEventListener('mousemove', e => {
  mx = e.clientX
  my = e.clientY
  cursor.style.left = mx + 'px'
  cursor.style.top = my + 'px'
})

function animRing() {
  // Lerp (Linear interpolation)
  // 0.25 = vitesse de rattrapage 
  rx += (mx - rx) * 0.25
  ry += (my - ry) * 0.25
  ring.style.left = rx + 'px'
  ring.style.top = ry + 'px'
  requestAnimationFrame(animRing)
}
animRing()

/* ─── SCROLL REVEAL ───────────────────────────────────────── */


const reveals = document.querySelectorAll('.reveal')

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    e.target.classList.toggle('visible', e.isIntersecting)
  })
}, { threshold: 0.15 })

reveals.forEach(r => obs.observe(r))

reveals.forEach(r => obs.observe(r))