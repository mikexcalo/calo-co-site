import styles from "./HowWeWork.module.css";

const steps = [
  {
    title: 'Discovery call',
    body: "A real conversation, not a pitch. We hear what you're working on, what's broken, what's working, and where you want to take it.",
  },
  {
    title: 'Plan with a quote',
    body: "Within a week, you get a written plan and a fixed quote. What we'll do, in what order, how long it'll take, and what it costs.",
  },
  {
    title: 'Build, operate, sustain, teach',
    body: "We do the work, then run it with you, refine what's working, and teach your team how to keep it going.",
  },
];

export default function HowWeWork() {
  return (
    <section className={styles.section}>
      <h2 className={`${styles.headline} display`}>
        How <em>we work.</em>
      </h2>

      <div className={styles.grid}>
        {steps.map((step) => (
          <div key={step.title}>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
