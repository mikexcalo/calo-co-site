import styles from './ArtScience.module.css'

export default function ArtScience() {
  return (
    <section className={`${styles.section} section-dark`}>
      <div className={styles.inner}>
        <div className={styles.headlineBlock}>
          <h2 className={`${styles.headline} display`}>
            Where art meets <em>science</em>.
          </h2>
          <p className={styles.subhead}>
            Where creative thinking meets <em>strategic execution</em>.
          </p>
        </div>

        <div className={styles.cards}>
          <article className={styles.card}>
            <span className={styles.cardTag}>01 · Brand + Design</span>
            <h3 className={`${styles.cardName} display`}>
              Stand out in a sea of <em>sameness</em>.
            </h3>
            <p className={styles.cardBody}>
              People decide how they feel about your business before they ever talk to you. We build the look, the voice, and the story that makes them want to.
            </p>
            <div className={styles.cardCaps}>
              Logo design · Visual identity · Brand systems · Voice <span className="amp">&amp;</span> tone · Positioning · Naming · Storytelling
            </div>
          </article>

          <article className={styles.card}>
            <span className={styles.cardTag}>02 · Marketing + Campaigns</span>
            <h3 className={`${styles.cardName} display`}>
              Reach customers <em>where they are</em>.
            </h3>
            <p className={styles.cardBody}>
              Getting in front of the right people is half the work — saying the right thing when you do is the other half. We handle both.
            </p>
            <div className={styles.cardCaps}>
              Website copy · Sales decks · Case studies · Email campaigns · Social content · SEO · Paid media · Events
            </div>
          </article>

          <article className={styles.card}>
            <span className={styles.cardTag}>03 · Growth + Systems</span>
            <h3 className={`${styles.cardName} display`}>
              Build a sustainable <em>growth engine</em>.
            </h3>
            <p className={styles.cardBody}>
              The website that brings in jobs, the way you send quotes, collect payment, and follow up without dropping the ball. We build it, wire it together, and teach you how to run it.
            </p>
            <div className={styles.cardCaps}>
              Websites · Quoting <span className="amp">&amp;</span> invoicing · Lead generation · Local SEO · Automations · AI workflows · Internal dashboards
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
