<script setup lang="ts">

</script>

<template>
 <div class="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style='font-family: "Be Vietnam Pro", "Noto Sans", sans-serif;'>
  <div class="layout-container flex h-full grow flex-col">
  <Appheader></Appheader>
  <main>
    <slot></slot>
    </main>
    <!---<Appfooter></Appfooter>-->
    
  </div>
 </div>
</template>