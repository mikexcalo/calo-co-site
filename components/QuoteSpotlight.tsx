'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './QuoteSpotlight.module.css'

const quotes = [
  {
    text: "I still set up my typewriter on the corner. But now LL Bean emails me to bring it to their events. CALO&CO didn\u2019t change what I do \u2014 they made the rest of the world see it.",
    name: "Stevie Trevi\u00F1o",
    role: "Founder, Stevie\u2019s Poem Store",
    portraitAlt: "Stevie Trevi\u00F1o",
  },
  {
    text: "I was a guy with a truck and a phone full of jobs from Lowe\u2019s. Now I\u2019m a brand. Same hands, same work \u2014 just finally the business I knew it could be.",
    name: "Leandro Gazolla",
    role: "Founder, LG Flooring",
    portraitAlt: "Leandro Gazolla",
  },
]

export default function QuoteSpotlight() {
  const [slide, setSlide] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const typeRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const cursorRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (typeRef.current) { clearInterval(typeRef.current); typeRef.current = null }
    if (autoRef.current) { clearTimeout(autoRef.current); autoRef.current = null }
    if (cursorRef.current) { clearTimeout(cursorRef.current); cursorRef.current = null }
  }, [])

  useEffect(() => {
    const fullText = quotes[slide].text
    let i = 0
    setDisplayedText('')
    setIsTyping(true)
    setShowCursor(true)

    if (typeRef.current) clearInterval(typeRef.current)
    if (autoRef.current) clearTimeout(autoRef.current)
    if (cursorRef.current) clearTimeout(cursorRef.current)

    typeRef.current = setInterval(() => {
      i++
      setDisplayedText(fullText.slice(0, i))
      if (i >= fullText.length) {
        if (typeRef.current) clearInterval(typeRef.current)
        setIsTyping(false)
        cursorRef.current = setTimeout(() => setShowCursor(false), 2000)
        autoRef.current = setTimeout(() => {
          setSlide((prev) => (prev + 1) % quotes.length)
        }, 6000)
      }
    }, 30)

    return clearTimers
  }, [slide, clearTimers])

  const goTo = (direction: 'prev' | 'next') => {
    clearTimers()
    setSlide((prev) => {
      if (direction === 'next') return (prev + 1) % quotes.length
      return (prev - 1 + quotes.length) % quotes.length
    })
  }

  const q = quotes[slide]

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.portraitCol}>
          {quotes.map((person, i) => (
            <div
              key={person.name}
              className={`${styles.portrait} ${i === slide ? styles.portraitActive : ''}`}
              role="img"
              aria-label={person.portraitAlt}
            />
          ))}
        </div>

        <div className={styles.contentCol}>
          <div className={styles.stars}>
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} className={styles.star} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.4c.32 0 .61.19.74.49l2.27 5.36 5.82.52a.8.8 0 0 1 .46 1.4l-4.42 3.85 1.34 5.71a.8.8 0 0 1-1.19.87L12 17.7l-4.99 2.9a.8.8 0 0 1-1.19-.87l1.34-5.71L2.74 10.17a.8.8 0 0 1 .46-1.4l5.82-.52L11.26 2.9c.13-.3.42-.49.74-.49z" />
              </svg>
            ))}
          </div>

          <blockquote className={styles.quote}>
            <span className={styles.quoteOpen}>&ldquo;</span>
            {displayedText}
            {showCursor && <span className={styles.cursor}>|</span>}
            {!isTyping && <span className={styles.quoteClose}>&rdquo;</span>}
          </blockquote>

          <div className={styles.attribution}>
            <div className={styles.name}>{q.name}</div>
            <div className={styles.role}>{q.role}</div>
          </div>

          <div className={styles.controls}>
            <span className={styles.counter}>
              {String(slide + 1).padStart(2, '0')} / {String(quotes.length).padStart(2, '0')}
            </span>
            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={() => goTo('prev')}
                aria-label="Previous quote"
              >
                &larr;
              </button>
              <button
                type="button"
                className={styles.arrowBtn}
                onClick={() => goTo('next')}
                aria-label="Next quote"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
