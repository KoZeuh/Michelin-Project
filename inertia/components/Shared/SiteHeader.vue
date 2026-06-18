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

      <div class="header-actions">
        <template v-if="!user">
          <Link href="/login" class="nav-auth-link">Connexion</Link>
          <Link href="/register" class="hbuy hbuy--register">S'inscrire</Link>
        </template>

        <template v-else>
          <div class="user-chip">
            <span class="user-avatar">{{ user.initials }}</span>
            <span class="user-name">{{ user.firstName ?? user.email }}</span>
          </div>
          <Link href="/logout" method="delete" as="button" class="nav-auth-link">Déconnexion</Link>
        </template>

        <button v-if="cartCount > 0" class="hbuy" @click="$emit('cart-click')">
          <span class="dot">{{ cartCount }}</span>
          Voir mon pack
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import { useBrand } from '~/composables/use_brand'
import type { Data } from '@generated/data'

const brand = useBrand()
const page = usePage<Data.SharedProps>()
const user = computed(() => page.props.user)

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

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-auth-link {
  font-size: 0.82rem;
  font-weight: 600;
  color: #c4cee0;
  white-space: nowrap;
  transition: color 0.2s;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.nav-auth-link:hover {
  color: #fff;
}

header.site.solid .nav-auth-link {
  color: var(--g70);
}

header.site.solid .nav-auth-link:hover {
  color: var(--blue);
}

.hbuy--register {
  background: var(--yellow);
  color: #000;
  border-radius: 7px;
  padding: 8px 14px;
  font-size: 0.82rem;
  font-weight: 800;
  transition: transform 0.15s, box-shadow 0.25s;
  display: inline-flex;
  align-items: center;
}

.hbuy--register:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(252, 229, 0, 0.3);
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  display: grid;
  place-items: center;
  letter-spacing: 0.02em;
  flex-shrink: 0;
}

.user-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #c4cee0;
  white-space: nowrap;
}

header.site.solid .user-name {
  color: var(--g70);
}

header.site.solid .user-avatar {
  background: var(--blue);
}

@media (max-width: 820px) {
  .user-name {
    display: none;
  }

  .nav-auth-link {
    display: none;
  }

  .hbuy--register {
    display: none;
  }
}
</style>
