<script setup lang="tsx">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Timeline from 'primevue/timeline'

const timelineSection = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined

onMounted(() => {
  // Keep content visible when animation is unavailable or unwanted.
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return

  const entries = timelineSection.value?.querySelectorAll('.timeline-entry')
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

  entries?.forEach((entry) => {
    entry.classList.add('reveal-pending')
    observer?.observe(entry)
  })
})

onBeforeUnmount(() => observer?.disconnect())

function LoadImage() {}

interface Phases {
  Title: string
  Date: string
  Description: string
  LoadImage?(): void
}

// the following are arbitrary examples, and are not representative of future events
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
    Title: 'Phase 2: Practical Work Begins!',
    Date: '7-2-2027',
    Description: '....',
  },
])
</script>

<template>
  <main>
    <section ref="timelineSection" class="updates-timeline">
      <Timeline :value="phases" :pt="{ event: { class: 'timeline-entry' } }">
        <template #opposite="{ item }">
          <time>{{ item.Date }}</time>
        </template>

        <template #content="{ item }">
          <h2>{{ item.Title }}</h2>
          <p>{{ item.Description }}</p>
        </template>
      </Timeline>
    </section>
  </main>
</template>

<style scoped>
.updates-timeline {
  padding: clamp(2rem, 5vw, 5rem) clamp(1.25rem, 5vw, 5rem);
}

.updates-timeline :deep(.timeline-entry) {
  min-height: 14rem;
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

.updates-timeline h2 {
  margin-bottom: 0.75rem;
  font-size: clamp(1.2rem, 3vw, 1.75rem);
}

.updates-timeline p {
  line-height: 1.7;
  overflow-wrap: anywhere;
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
