import './style.css'
import Typed from 'typed.js'

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

/* ─── TYPED.JS ───────────────────────────────────────────── */

new Typed('.ME-role', {
  strings: [
    'Web Developer & <em>Digital Craftsman</em>',
    'Frontend Enthusiast',
    'Linux Nerd (btw)',
    'Open to Internship 👀',
  ],
  startdelay: 1000,
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  smartBackspace: true,
})

new Typed('p.contact-blurb', {
  strings: [
    "Looking for a dev who brings both <em>creativity</em> and technical precision? I'm available for internship starting now.",
    'from <em>June the 1st</em> and at least one month',
    'Have a nice day ',
  ],
  startdelay: 1000,
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  smartBackspace: true,
})