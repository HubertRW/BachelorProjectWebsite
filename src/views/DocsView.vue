<script setup lang="ts">
const resources = [
  {
    title: 'GitHub repository',
    description: 'Source code, setup instructions, and project releases.',
    url: 'https://github.example.com/group-name/bachelor-project',
    label: 'View repository',
  },
  {
    title: 'CAD & design files',
    description: '3D models, assembly drawings, and mechanical designs.',
    url: 'https://cad.example.com/group-name/designs',
    label: 'Explore CAD files',
  },
  {
    title: 'Reports & documentation',
    description: 'Project reports, technical specifications, and user guides.',
    url: 'https://docs.example.com/group-name/reports',
    label: 'Browse documentation',
  },
  {
    title: 'Testing & results',
    description: 'Test plans, measurements, and validation notes.',
    url: 'https://docs.example.com/group-name/testing',
    label: 'View test archive',
  },
]
</script>

<template>
  <main class="docs-page page-section">
    <header class="docs-heading">
      <p class="eyebrow">Behind the project</p>
      <h1>Documentation <em>& contact.</em></h1>
      <p>Explore our project materials or get in touch with the team.</p>
    </header>

    <div class="docs-sections">
      <section class="docs-card resources-card" aria-labelledby="resources-title">
        <div class="section-heading">
          <span class="section-index" aria-hidden="true">01</span>
          <h2 id="resources-title">More Resources</h2>
        </div>
        <p class="section-intro">A home for the files and findings we will share along the way.</p>
        <ul class="resource-list">
          <li v-for="resource in resources" :key="resource.title">
            <div class="resource-heading">
              <h3>{{ resource.title }}</h3>
              <span class="resource-status">Coming soon</span>
            </div>
            <p>{{ resource.description }}</p>
            <a :href="resource.url" target="_blank" rel="noopener noreferrer">
              {{ resource.label }} <span class="link-note">(placeholder)</span>
              <span aria-hidden="true">↗</span>
              <span class="visually-hidden">, opens in a new tab</span>
            </a>
          </li>
        </ul>
        <p class="demo-note">
          These fictional links use example.com domains. Real project resources will be added here
          later.
        </p>
      </section>

      <section class="docs-card contact-card" aria-labelledby="contact-title">
        <div class="section-heading">
          <span class="section-index" aria-hidden="true">02</span>
          <h2 id="contact-title">Contact Us</h2>
        </div>
        <p class="section-intro">
          Questions about the project? Here is where you will be able to reach us.
        </p>
        <dl class="contact-list">
          <div>
            <dt>Email</dt>
            <dd>
              <a href="mailto:team@example.com"
                >team@example.com <span aria-hidden="true">↗</span></a
              >
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>+47 ... ... ..</dd>
          </div>
          <div>
            <dt>Project contact</dt>
            <dd>Alex Example <span class="contact-detail">Student project coordinator</span></dd>
          </div>
          <div>
            <dt>Visit us</dt>
            <dd>
              USN Campus in Kongsberg<span class="contact-detail"
                > Hasbergsvei 36, Kongsberg</span
              >
            </dd>
          </div>
        </dl>
        <p class="demo-note">
          All contact details are fictional placeholders, not active team contact information.
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.docs-page {
  max-width: 1440px;
  margin: 0 auto;
  padding-top: clamp(2.5rem, 5vw, 4.5rem);
  padding-bottom: clamp(3rem, 5vw, 5rem);
}
.docs-heading {
  margin-bottom: 2.5rem;
}
.docs-heading h1 {
  margin: 1rem 0;
  font-family: var(--serif);
  font-size: clamp(2.75rem, 5vw, 4.75rem);
  line-height: 1.05;
  font-weight: 400;
  letter-spacing: -0.035em;
}
.docs-heading h1 em {
  color: var(--accent);
  font-weight: 400;
}
.docs-heading > p:last-child,
.section-intro {
  color: var(--ink-soft);
  font-size: 0.9rem;
  line-height: 1.7;
}
.docs-sections {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
}
.docs-card {
  padding: clamp(1.25rem, 3vw, 2rem);
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--white);
}
.section-heading {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 0.75rem;
}
.section-index {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border: 1px solid var(--line);
  border-radius: 50%;
  font-size: 0.65rem;
  color: var(--accent);
}
.section-heading h2 {
  font-family: var(--serif);
  font-size: 2rem;
  font-weight: 400;
  line-height: 1.1;
}
.resource-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
}
.resource-list li {
  padding: 1rem 0;
  border-top: 1px solid var(--line);
}
.resource-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.resource-heading h3 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
}
.resource-status {
  border-radius: 20px;
  padding: 0.25rem 0.5rem;
  background: var(--paper);
  color: var(--ink-soft);
  font-size: 0.6rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.resource-list li > p {
  margin: 0.5rem 0;
  font-size: 0.8rem;
  color: var(--ink-soft);
  line-height: 1.6;
}
.resource-list a {
  font-size: 0.75rem;
  font-weight: 500;
}
.link-note {
  color: var(--ink-soft);
  font-weight: 400;
}
.docs-card a {
  overflow-wrap: anywhere;
  text-decoration: underline;
  text-decoration-color: var(--line);
  text-underline-offset: 4px;
}
.docs-card a:hover {
  text-decoration-color: var(--accent);
}
.docs-card a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 5px;
  border-radius: 2px;
}
.docs-card a > span[aria-hidden] {
  margin-left: 0.3rem;
  color: var(--accent);
}
.contact-list {
  margin: 1.5rem 0 0;
}
.contact-list > div {
  padding: 1rem 0;
  border-top: 1px solid var(--line);
}
.contact-list dt {
  margin-bottom: 0.5rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-soft);
}
.contact-list dd {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
}
.contact-detail {
  display: block;
  color: var(--ink-soft);
  font-size: 0.8rem;
}
.demo-note {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  color: var(--ink-soft);
  font-size: 0.72rem;
  line-height: 1.6;
}
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
@media (max-width: 760px) {
  .docs-sections {
    grid-template-columns: 1fr;
  }
}
</style>
