<template>
  <header class="site solid">
    <div class="wrap site-in">
      <Link href="/" class="logo">
        <img v-if="brand.logoUrl" :src="brand.logoUrl" :alt="brand.name" class="logo-img" />
        <div v-else class="bib"></div>
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
import { useBrand } from '~/composables/useBrand'

const brand = useBrand()

defineProps({
  scrolled: {
    type: Boolean,
    default: false,
  },
  cartCount: {
    type: Number,
    default: 0,
  },
})

defineEmits(['cart-click', 'nav-stage'])
</script>

<style scoped>
.logo-img {
  height: 34px;
  width: auto;
  object-fit: contain;
  display: block;
}
</style>
