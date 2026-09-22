<script setup lang="tsx">
import {ref} from 'vue';
import Timeline from 'primevue/timeline'

function LoadImage(){}

interface Phases{
    Title: string,
    Date: string,
    Description: string,
    LoadImage?(): void; 
}

// the following are arbitrary examples, and are not representative of future events
const phases = ref<Phases[]>([
    {
        Title: 'Project Kick-off',
        Date: "5-1-2027",
        Description:"Defined the project goals and assigned responsibilities."
    },
    {
        Title: "Initial Research & Problem Definition",
        Date: "11-1-2027",
        Description:"Reviewed existing solutions and gathered requirements.",
    },
    {
        Title: "Phase 2: Practical Work Begins!",
        Date: "7-2-2027",
        Description:"....",
    },
]);

</script>


<template>
    <main>
        <section>
            <Timeline :value="phases">
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