<script setup lang="ts">
import StudentCard from '@/components/StudentCard.vue'

const students = [
  { number: '01', name: 'Hubert Rwechungura', discipline: 'Software Engineer', focus: 'Role / Area of focus' },
  { number: '02', name: 'Jon Emil Sæterøy', discipline: 'Mechanical Engineer', focus: 'Role / Area of focus' },
  { number: '03', name: 'Veronica Sætre', discipline: 'Electrical Engineer', focus: 'Role / Area of focus' },
  { number: '04', name: 'Adrian Nilsson', discipline: 'Mechanical Engineer', focus: 'Role / Area of focus' },
  { number: '05', name: 'Sonia Salvatore Guiseppe', discipline: 'Software Engineer', focus: 'Role / Area of focus' },
  { number: '06', name: 'Jamshid Nayab', discipline: 'Electrical Engineer', focus: 'Role / Area of focus' },
]
</script>

<template>
  <main>
    <section class="about-hero page-section">
      <div>
        <p class="eyebrow">About us</p>
        <h1>Meet the<br /><em>engineers.</em></h1>
      </div>
      <p class="about-intro">
        Six students from USN, bringing different engineering perspectives together to solve one
        meaningful challenge.
      </p>
    </section>

    <section class="student-grid page-section" aria-label="Team members">
      <StudentCard
        v-for="student in students"
        :key="student.number"
        v-bind="student"
      />
    </section>

    <section class="about-footer-note page-section">
      <span>06 students</span>
      <p>Built on curiosity, collaboration, and a shared commitment to good engineering.</p>
      <span>01 team</span>
    </section>
  </main>
</template>
