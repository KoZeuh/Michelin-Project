<template>
  <header class="site" :class="{ solid: scrolled }">
    <div class="wrap site-in">
      
      <Link href="/" class="logo">
        <div class="bib">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="10"/></svg>
        </div>
        <div class="wd">MICHELIN</div>
        <div class="ride-tag">UNLOCK &amp; RIDE</div>
      </Link>
      
      <div class="nav">
        <a href="#stage" @click.prevent="$emit('nav-stage')">La Gamme</a>
        
        <Link href="/pourquoi-michelin">Pourquoi Michelin ?</Link>
      </div>

      <button class="hbuy" @click="$emit('cart-click')">
        <span class="dot">{{ cartCount }}</span>
        Voir mon pack
      </button>
    </div>
  </header>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'

defineProps({
  scrolled: {
    type: Boolean,
    default: false
  },
  cartCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['cart-click', 'nav-stage'])
</script>