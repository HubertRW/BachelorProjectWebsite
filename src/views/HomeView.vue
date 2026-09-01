<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>


<style scoped>

.USN-logo{
  display: flex;
  width: 300px;
  height: 500px;
  justify-content:center;
  align-items:center;
}

</style>


<template>
  <main>
    <section class="hero page-section">
      <div class="hero-copy">
        <p class="eyebrow">USN · Bachelor Project · 2027  </p>
        <h1>Engineering ideas<br /><em>into impact.</em></h1>
        <p class="hero-intro">
          We are <strong>GROUP NAME</strong>, a team of six engineering students at the University
          of South-Eastern Norway, working together on our bachelor project.
        </p>
        <div class="hero-actions">
          <RouterLink class="button button-primary" to="/about">Meet the team</RouterLink>
          <a class="text-link" href="#project">Our project <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div class="USN-logo">
        <img src="./USN-symbol_sort.png">
      </div>
      
    </section>

    <section id="project" class="project-section page-section">
      <div class="section-number">Group Number: --</div>
      <div class="project-heading">
        <p class="eyebrow">The bachelor project</p>
        <h2>Different disciplines.<br />A common goal.</h2>
      </div>
      <div class="project-copy">
        <p>
          Our combined knowledge gives us the tools to approach complex challenges from several
          angles. Together, we research, design, test, and build a solution grounded in real needs.
        </p>
        <p class="placeholder-note">
          Replace this text with a short introduction to your bachelor project, industry partner,
          and the challenge your team is solving.
        </p>
      </div>
    </section>

    <section class="team-callout page-section">
      <p class="eyebrow">The people behind the project</p>
      <div class="callout-row">
        <h2>Six minds,<br />one team.</h2>
        <RouterLink class="round-link" to="/about" aria-label="Meet all team members">↗</RouterLink>
      </div>
    </section>
  </main>
</template>


