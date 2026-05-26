'use client'
import { useState } from 'react'
import styles from './WhatWeDo.module.css'

const items = [
  { header: '[Service one]', body: '[Placeholder — what this service covers and the outcome the client gets.]' },
  { header: '[Service two]', body: '[Placeholder — what this service covers and the outcome the client gets.]' },
  { header: '[Service three]', body: '[Placeholder — what this service covers and the outcome the client gets.]' },
  { header: '[Service four]', body: '[Placeholder — what this service covers and the outcome the client gets.]' },
]

export default function WhatWeDo() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>What We Do</span>
        <h2 className={styles.headline}>
          [Placeholder headline — everything we offer and everything
          they get, said in one confident line.]
        </h2>

        <ul className={styles.accordion}>
          {items.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <li key={i} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
                <button
                  className={styles.row}
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(i)}
                >
                  <span className={styles.rowLabel}>{item.header}</span>
                  <span className={styles.sign} aria-hidden />
                </button>
                <div className={styles.body}>
                  <div className={styles.bodyInner}>
                    <p>{item.body}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
