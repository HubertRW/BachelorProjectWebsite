<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Timeline from 'primevue/timeline'

const timelineSection = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return
  observer = new IntersectionObserver(
    (changes) => {
      for (const change of changes) {
        if (change.isIntersecting) {
          change.target.classList.remove('reveal-pending')
          observer?.unobserve(change.target)
        }
      }
    },
    { threshold: 0, rootMargin: '0px 0px -32px 0px' },
  )
  timelineSection.value?.querySelectorAll('.timeline-entry').forEach((entry) => {
    entry.classList.add('reveal-pending')
    observer?.observe(entry)
  })
})
onBeforeUnmount(() => observer?.disconnect())

interface Phases {
  Title: string
  Date: string
  Description: string
  Image?: string
}

function isoDate(date: string) {
  const [day = '', month = '', year = ''] = date.split('-')
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function displayDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(isoDate(date)))
}

// These are sample milestones, not confirmed future events.
// Add an Image URL to a milestone to replace its placeholder.
const phases = ref<Phases[]>([
  {
    Title: 'Project Kick-off',
    Date: '5-1-2027',
    Description: 'Defined the project goals and assigned responsibilities.',
  },
  {
    Title: 'Initial Research & Problem Definition',
    Date: '11-1-2027',
    Description: 'Reviewed existing solutions and gathered requirements.',
  },
  {
    Title: 'First Presentation',
    Date: '7-2-2027',
    Description: '...',
  },
])
</script>

<template>
  <main class="updates-page page-section">
    <header class="updates-heading">
      <div>
        <p class="eyebrow">The project journal · 2027</p>
        <h1>Our progress,<br /><em>step by step.</em></h1>
      </div>
      <p class="updates-intro">
        Follow our bachelor project from the first ideas to the final presentation. A place for the
        milestones, discoveries, and moments along the way.
      </p>
    </header>

    <section ref="timelineSection" class="updates-timeline" aria-label="Project milestones">
      <div class="timeline-heading">
        <p class="eyebrow">Project timeline</p>
        <span>{{ String(phases.length).padStart(2, '0') }} milestones · Sample entries</span>
      </div>
      <Timeline :value="phases" :pt="{ event: { class: 'timeline-entry' } }">
        <template #opposite="{ item }">
          <time class="milestone-date" :datetime="isoDate(item.Date)">{{
            displayDate(item.Date)
          }}</time>
        </template>
        <template #marker="{ index }">
          <span class="milestone-marker" aria-hidden="true">{{
            String(index + 1).padStart(2, '0')
          }}</span>
        </template>
        <template #content="{ item, index }">
          <article class="milestone-card" :aria-labelledby="`milestone-${index}`">
            <div class="milestone-copy">
              <p class="milestone-label">Milestone {{ String(index + 1).padStart(2, '0') }}</p>
              <time class="mobile-date" :datetime="isoDate(item.Date)">{{
                displayDate(item.Date)
              }}</time>
              <h2 :id="`milestone-${index}`">{{ item.Title }}</h2>
              <p class="milestone-description">{{ item.Description }}</p>
            </div>
            <div class="milestone-media" :class="`media-tone-${index % 3}`">
              <img v-if="item.Image" :src="item.Image" :alt="item.Title" loading="lazy" />
              <div
                v-else
                class="image-placeholder"
                role="img"
                :aria-label="`Image placeholder for ${item.Title}`"
              >
                <span class="placeholder-index" aria-hidden="true">{{
                  String(index + 1).padStart(2, '0')
                }}</span>
                <svg class="placeholder-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <rect x="7" y="10" width="34" height="28" rx="3" />
                  <circle cx="17" cy="19" r="3" />
                  <path d="m8 33 10-9 8 7 6-5 9 8" />
                </svg>
                <span class="placeholder-caption">A moment in the making</span>
                <span class="image-note">Image coming soon</span>
              </div>
            </div>
          </article>
        </template>
      </Timeline>
      <p class="timeline-end"><span aria-hidden="true">↘</span> More to come. Follow along.</p>
    </section>
  </main>
</template>

<style scoped>
.updates-page {
  max-width: 1440px;
  margin: 0 auto;
  padding-top: clamp(3rem, 7vw, 6rem);
  padding-bottom: clamp(3rem, 7vw, 6rem);
}
.updates-heading {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  align-items: end;
  gap: 3rem;
  margin-bottom: clamp(3rem, 6vw, 5rem);
}
.updates-heading h1 {
  margin-top: 1.25rem;
  font-family: var(--serif);
  font-size: clamp(3.5rem, 6.5vw, 6.5rem);
  font-weight: 400;
  line-height: 0.98;
  letter-spacing: -0.04em;
}
.updates-heading h1 em {
  color: var(--accent);
  font-weight: 400;
}
.updates-intro {
  max-width: 390px;
  padding-bottom: 0.35rem;
  color: var(--ink-soft);
  line-height: 1.8;
}
.timeline-heading {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 0;
  margin-bottom: 2rem;
  border-top: 1px solid var(--line);
}
.timeline-heading > span {
  color: var(--ink-soft);
  font-size: 0.75rem;
}
.updates-timeline :deep(.timeline-entry) {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 650ms ease-out,
    transform 650ms ease-out;
}
.updates-timeline :deep(.timeline-entry.reveal-pending) {
  opacity: 0;
  transform: translateY(24px);
}
.updates-timeline :deep(.p-timeline-event-opposite) {
  flex: 0 0 135px;
  padding: 0.85rem 1.5rem 0 0;
  text-align: right;
}
.updates-timeline :deep(.p-timeline-event-content) {
  min-width: 0;
  padding: 0 0 2rem 1.75rem;
}
.updates-timeline :deep(.p-timeline-event-connector) {
  width: 1px;
  background: var(--line);
}
.milestone-date {
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;
}
.milestone-marker {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--accent);
  border-radius: 50%;
  color: var(--accent);
  background: var(--paper);
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}
.milestone-card {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--white);
  box-shadow: 0 6px 22px rgb(16 36 63 / 3%);
}
.milestone-copy {
  align-self: center;
  padding: clamp(1.5rem, 3vw, 2.5rem);
}
.milestone-label {
  margin-bottom: 1rem;
  color: var(--ink-soft);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.milestone-copy h2 {
  margin-bottom: 0.85rem;
  font-family: var(--serif);
  font-size: clamp(1.75rem, 2.8vw, 2.5rem);
  font-weight: 400;
  line-height: 1.12;
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
}
.milestone-description {
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.75;
  overflow-wrap: anywhere;
}
.mobile-date {
  display: none;
}
.milestone-media {
  min-height: 250px;
  position: relative;
  background: #e8e4da;
  color: #556052;
  border-left: 1px solid var(--line);
}
.media-tone-1 {
  background: #e1e7e9;
  color: #435e6a;
}
.media-tone-2 {
  background: #efe0d5;
  color: #885740;
}
.milestone-media img {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: cover;
}
.image-placeholder {
  min-height: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 2rem 1rem;
  background-image:
    linear-gradient(rgb(255 255 255 / 22%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 22%) 1px, transparent 1px);
  background-size: 28px 28px;
}
.placeholder-index {
  position: absolute;
  right: -0.25rem;
  bottom: -2.5rem;
  z-index: -1;
  font-family: var(--serif);
  font-size: 13rem;
  line-height: 1;
  opacity: 0.08;
}
.placeholder-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 0.75rem;
  stroke: currentColor;
  stroke-width: 1.2;
}
.placeholder-caption {
  font-family: var(--serif);
  font-size: 1.35rem;
  text-align: center;
}
.image-note {
  margin-top: 0.5rem;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.timeline-end {
  margin-left: 177px;
  padding-left: 1.75rem;
  color: var(--ink-soft);
  font-size: 0.85rem;
}
.timeline-end span {
  margin-right: 0.5rem;
  color: var(--accent);
}
@media (max-width: 900px) {
  .updates-timeline :deep(.p-timeline-event-opposite) {
    flex-basis: 110px;
    padding-right: 1rem;
  }
  .milestone-card {
    grid-template-columns: 1fr;
  }
  .milestone-media {
    min-height: 210px;
    border-left: 0;
    border-top: 1px solid var(--line);
  }
  .image-placeholder {
    min-height: 210px;
  }
  .timeline-end {
    margin-left: 152px;
  }
}
@media (max-width: 600px) {
  .updates-heading {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .timeline-heading {
    flex-direction: column;
    gap: 0.6rem;
  }
  .updates-timeline :deep(.p-timeline-event-opposite) {
    display: none;
  }
  .updates-timeline :deep(.p-timeline-event-content) {
    padding-left: 1rem;
  }
  .milestone-marker {
    width: 32px;
    height: 32px;
    font-size: 0.65rem;
  }
  .mobile-date {
    display: block;
    margin: -0.4rem 0 1rem;
    color: var(--ink-soft);
    font-size: 0.75rem;
  }
  .timeline-end {
    margin-left: 32px;
    padding-left: 1rem;
  }
}
@media (prefers-reduced-motion: reduce), print {
  .updates-timeline :deep(.timeline-entry),
  .updates-timeline :deep(.timeline-entry.reveal-pending) {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
