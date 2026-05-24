import './style.css'
import Typed from 'typed.js'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
})

function lenisRaf(time) {
  lenis.raf(time)
  ScrollTrigger.update()
  requestAnimationFrame(lenisRaf)
}
requestAnimationFrame(lenisRaf)

// Empêche Lenis de bloquer les liens d'ancre de la nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault()
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) lenis.scrollTo(target, { offset: -80, duration: 1.4 })
  })
})

// CUSTOM CURSOR

const cursor = document.getElementById('cursor')
const ring   = document.getElementById('cursor-ring')
let mx = 0, my = 0, rx = 0, ry = 0

document.addEventListener('mousemove', e => {
  mx = e.clientX
  my = e.clientY
  cursor.style.left = mx + 'px'
  cursor.style.top  = my + 'px'
})

function animRing() {
  rx += (mx - rx) * 0.25
  ry += (my - ry) * 0.25
  ring.style.left = rx + 'px'
  ring.style.top  = ry + 'px'
  requestAnimationFrame(animRing)
}
animRing()

// Effet de scale sur les éléments interactifs
document.querySelectorAll('a, button, .skill-cell, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)'
    ring.style.transform   = 'translate(-50%,-50%) scale(1.4)'
    ring.style.opacity     = '1'
  })
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)'
    ring.style.transform   = 'translate(-50%,-50%) scale(1)'
    ring.style.opacity     = '0.6'
  })
})

function initScrollAnimations() {
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  })

  // Skill cells : cascade scroll
  gsap.fromTo('.skill-cell',
    { opacity: 0, y: 30, scale: 0.96 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 85%',
      }
    }
  )

  // Section titles : slide from left
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        }
      }
    )
  })

  // About text paragraphes : sequential fade
  gsap.fromTo('.about-text p',
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 85%',
      }
    }
  )

  // Contact links : cascade
  gsap.fromTo('.contact-item',
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: '.contact-links',
        start: 'top 88%',
      }
    }
  )
}


// TYPED.JS

new Typed('.ME-role', {
  strings: [
    'Web Developer & <em>Digital Craftsman</em>',
    'Frontend Enthusiast',
    'Linux Nerd (btw)',
    'Open to Internship 👀',
  ],
  startDelay: 1000,
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
  startDelay: 1000,
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  smartBackspace: true,
})

const GH_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`

const FALLBACK_PROJECTS = [
  {
    name: 'Alice-In-Wonderland',
    description: 'A personal NLP engine for classic literature sourced from Project Gutenberg. Bookworm downloads books automatically and runs full analysis pipelines: lexical diversity, topic modeling via TF-IDF + LSA, named entity recognition, extractive summarization, and cosine-similarity book recommendations. No API keys. No setup beyond a pip install.',
    html_url: 'https://github.com/yAnn-99/Alice-In-Wonderland',
    topics: ['python', 'nlp', 'cli'],
    language: 'Python',
    stargazers_count: 0,
  },
  {
    name: 'Game-Of-Life',
    description: "Conway's Game of Life implemented in Go during a 6-hour Epitech rush. The challenge: use an unfamiliar language under pressure. Learned Go fundamentals, architecture setup, and delivered a working solution.",
    html_url: 'https://github.com/yAnn-99/Game-Of-Life',
    topics: ['go', 'rush'],
    language: 'Go',
    stargazers_count: 0,
  },
  {
    name: 'Easy-TeamSpeak6-Setup',
    description: 'One-click setup script for a local TeamSpeak 6 server on any OS. Built as a template repo for easy deployment — picked up a star on GitHub. Shows off my sysadmin and scripting skills.',
    html_url: 'https://github.com/yAnn-99/Easy-TeamSpeak6-Setup',
    topics: ['shell', 'devtools'],
    language: 'Shell',
    stargazers_count: 1,
  },
  {
    name: 'Holy-creation',
    description: 'A checkpoint of my Arch Linux rice — custom theming, window manager config, and visual setup. Because your desktop should be as beautiful as your code. Personal project, regularly updated.',
    html_url: 'https://github.com/yAnn-99/Holy-creation',
    topics: ['css', 'linux'],
    language: 'CSS',
    stargazers_count: 0,
  },
  {
    name: 'Portfolio',
    description: 'A concise and structured portfolio built with Vite, Tailwind CSS and vanilla JavaScript.',
    html_url: 'https://github.com/yAnn-99/Portfolio',
    topics: ['vite', 'tailwind'],
    language: 'JavaScript',
    stargazers_count: 0,
  },
]

function formatRepoName(name) {
  return name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function formatLang(repo) {
  const parts = []
  if (repo.language) parts.push(repo.language)
  if (repo.topics && repo.topics.length) {
    // Exclut le topic "portfolio" qui est juste un filtre
    const extra = repo.topics
      .filter(t => t !== 'portfolio')
      .slice(0, 2)
      .map(t => t.charAt(0).toUpperCase() + t.slice(1))
    parts.push(...extra)
  }
  return parts.join(' · ') || 'Code'
}

function renderProjectCard(repo, index, isFeatured) {
  const num    = String(index + 1).padStart(2, '0')
  const title  = formatRepoName(repo.name)
  const lang   = formatLang(repo)
  const desc   = repo.description || 'No description provided.'
  const url    = repo.html_url

  // Classes BEM sur la section projects
  const cardClass = isFeatured
    ? 'project-card project-card--featured featured reveal'
    : 'project-card reveal'

  return `
    <div class="${cardClass}">
      <div class="project-card__num project-num">${num}</div>
      <div class="project-card__lang project-lang">${lang}</div>
      <div class="project-card__name project-name">${title}</div>
      <div class="project-card__desc project-desc">${desc}</div>
      <div class="project-card__links project-links">
        <a href="${url}" target="_blank" rel="noopener" class="project-card__link project-link">
          ${GH_ICON}
          GitHub
        </a>
        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener" class="project-card__link project-link">↗ Live</a>` : ''}
        ${repo.stargazers_count > 0 ? `<span class="project-card__stars project-stars">★ ${repo.stargazers_count}</span>` : ''}
      </div>
    </div>
  `
}

function renderSkeletons(grid, count = 5) {
  grid.innerHTML = Array.from({ length: count }, (_, i) => `
    <div class="project-card__skeleton project-skeleton${i === 0 ? ' featured' : ''}">
      <div class="skeleton-line skeleton-line--short"></div>
      <div class="skeleton-line skeleton-line--title"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line skeleton-line--short"></div>
    </div>
  `).join('')
}

async function fetchAndRenderProjects() {
  const grid = document.querySelector('.projects-grid')
  if (!grid) return

  renderSkeletons(grid)

  try {
    const res = await fetch(
      'https://api.github.com/users/yAnn-99/repos?per_page=100&sort=pushed',
      { headers: { Accept: 'application/vnd.github+json' } }
    )

    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

    const allRepos = await res.json()

    let repos = allRepos
      .filter(r => r.topics && r.topics.includes('portfolio'))
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6)

    if (repos.length === 0) {
      repos = allRepos
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 6)
    }

    // Render les cards
    grid.innerHTML = repos
      .map((repo, i) => renderProjectCard(repo, i, i === 0))
      .join('')

  } catch (err) {
    console.warn('GitHub API unavailable, using fallback:', err)
    // Fallback : projets hardcodés
    grid.innerHTML = FALLBACK_PROJECTS
      .map((repo, i) => renderProjectCard(repo, i, i === 0))
      .join('')
  }

  gsap.fromTo('.project-card',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 85%',
      }
    }
  )
}


const CV_URL = '/Portfolio/CV_Yanis_Cherif.pdf'

document.querySelectorAll('a[data-cv]').forEach(link => {
  link.href = CV_URL
  link.setAttribute('download', 'CV_Yanis_Cherif.pdf')
})

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvzqqdo'

async function handleContactForm(e) {
  e.preventDefault()
  const form   = e.target
  const btn    = form.querySelector('.contact-form__btn')
  const status = form.querySelector('.contact-form__status')

  btn.textContent = 'Sending...'
  btn.disabled    = true
  btn.classList.add('contact-form__btn--loading')
  status.textContent = ''
  status.className   = 'contact-form__status'

  const data = {
    name:    form.querySelector('#cf-name').value,
    email:   form.querySelector('#cf-email').value,
    message: form.querySelector('#cf-message').value,
  }

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body:    JSON.stringify(data),
    })

    if (res.ok) {
      status.textContent = '✓ Message sent — I\'ll get back to you soon.'
      status.classList.add('contact-form__status--success')
      form.reset()
      btn.textContent = '✓ Sent'
      btn.classList.remove('contact-form__btn--loading')
      btn.classList.add('contact-form__btn--success')
    } else {
      throw new Error('Form submission failed')
    }
  } catch {
    status.textContent = '✗ Something went wrong. Try emailing me directly.'
    status.classList.add('contact-form__status--error')
    btn.textContent = 'Send Message'
    btn.disabled    = false
    btn.classList.remove('contact-form__btn--loading')
  }
}

const contactForm = document.getElementById('contact-form')
if (contactForm) contactForm.addEventListener('submit', handleContactForm)

fetchAndRenderProjects()
initScrollAnimations()