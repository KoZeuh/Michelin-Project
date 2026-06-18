<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head, usePage } from '@inertiajs/vue3'
import MichelinAuthLayout from '~/layouts/michelin-auth.vue'
import SiteHeader from '~/components/Shared/SiteHeader.vue'
import type { Data } from '@generated/data'

defineOptions({
  layout: MichelinAuthLayout,
})

interface PromoCode {
  id: number
  code: string
  packName: string
  packCategory: string
  createdAt: string | null
  expiresAt: string
  isValid: boolean
}

const props = defineProps<{
  codes: PromoCode[]
}>()

const page = usePage<Data.SharedProps>()
const user = computed(() => page.props.user)

const validCount = computed(() => props.codes.filter((c) => c.isValid).length)

const fmtDate = (iso: string | null) =>
  iso
    ? new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(iso))
    : '—'

const copiedId = ref<number | null>(null)

const copyCode = async (code: PromoCode) => {
  try {
    await navigator.clipboard.writeText(code.code)
    copiedId.value = code.id
    setTimeout(() => {
      if (copiedId.value === code.id) copiedId.value = null
    }, 1800)
  } catch {
    /* clipboard indisponible */
  }
}
</script>

<template>
  <Head title="Mon profil — Michelin" />

  <div class="profile-page">
    <SiteHeader />

    <main class="profile-main wrap">
      <!-- En-tête profil -->
      <header class="profile-head">
        <div class="profile-id">
          <span class="profile-avatar">{{ user?.initials }}</span>
          <div class="profile-id-text">
            <span class="eyebrow profile-eyebrow">Espace finisher</span>
            <h1 class="titling profile-title">
              {{ user?.firstName ?? user?.email }}
            </h1>
            <p class="profile-email">{{ user?.email }}</p>
          </div>
        </div>

        <div class="profile-stats">
          <div class="pstat">
            <span class="pstat-v">{{ codes.length }}</span>
            <span class="pstat-k">Codes générés</span>
          </div>
          <span class="pstat-sep"></span>
          <div class="pstat">
            <span class="pstat-v">{{ validCount }}</span>
            <span class="pstat-k">Encore valides</span>
          </div>
        </div>
      </header>

      <!-- Liste des codes -->
      <section class="profile-codes">
        <div class="codes-head">
          <span class="eyebrow" style="color: var(--yellow)">Mes codes promo</span>
          <p class="codes-sub">
            Tes codes débloqués via l'application. Valables 48 heures après génération.
          </p>
        </div>

        <!-- État vide -->
        <div v-if="codes.length === 0" class="codes-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" width="40" height="40">
            <rect x="3" y="8" width="18" height="12" rx="2" />
            <path d="M3 12h18" />
            <path d="M7 8V6a5 5 0 0 1 10 0v2" />
          </svg>
          <p>Tu n'as pas encore généré de code promo.</p>
          <span>Rends-toi sur l'application pour débloquer ton premier pack finisher.</span>
        </div>

        <!-- Grille des codes -->
        <ul v-else class="codes-grid">
          <li v-for="code in codes" :key="code.id" class="ccard" :class="{ 'ccard--expired': !code.isValid }">
            <div class="ccard-top">
              <span class="ccard-cat">{{ code.packCategory }}</span>
              <span class="ccard-status" :class="code.isValid ? 'is-valid' : 'is-expired'">
                <span class="dot"></span>
                {{ code.isValid ? 'Valide' : 'Expiré' }}
              </span>
            </div>

            <h3 class="ccard-pack">{{ code.packName }}</h3>

            <button class="ccard-code mono" type="button" @click="copyCode(code)" :title="'Copier ' + code.code">
              <span class="ccard-code-value">{{ code.code }}</span>
              <span class="ccard-copy">
                <svg v-if="copiedId !== code.id" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="14" height="14">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {{ copiedId === code.id ? 'Copié' : 'Copier' }}
              </span>
            </button>

            <div class="ccard-foot">
              <div class="ccard-meta">
                <span class="ccard-meta-k">Généré le</span>
                <span class="ccard-meta-v">{{ fmtDate(code.createdAt) }}</span>
              </div>
              <div class="ccard-meta">
                <span class="ccard-meta-k">{{ code.isValid ? 'Expire le' : 'Expiré le' }}</span>
                <span class="ccard-meta-v">{{ fmtDate(code.expiresAt) }}</span>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<style scoped>
.profile-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.profile-main {
  flex: 1;
  padding-top: 116px;
  padding-bottom: 80px;
}

/* ===== En-tête ===== */
.profile-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding-bottom: 32px;
  margin-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-id {
  display: flex;
  align-items: center;
  gap: 18px;
}

.profile-avatar {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: var(--blue);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #fff;
  font-size: 1.3rem;
  font-weight: 800;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.profile-eyebrow {
  color: var(--yellow);
}

.profile-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  margin: 6px 0 4px;
}

.profile-email {
  font-size: 0.86rem;
  color: #9fb0d4;
}

.profile-stats {
  display: flex;
  align-items: center;
  gap: 26px;
  background: rgba(14, 28, 62, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 18px 26px;
}

.pstat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pstat-v {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
  color: var(--yellow);
}

.pstat-k {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8595ba;
}

.pstat-sep {
  width: 1px;
  align-self: stretch;
  background: rgba(255, 255, 255, 0.1);
}

/* ===== Section codes ===== */
.codes-head {
  margin-bottom: 24px;
}

.codes-sub {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #8595ba;
}

/* État vide */
.codes-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  padding: 64px 24px;
  background: rgba(14, 28, 62, 0.55);
  border: 1px dashed rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  color: #6b7ea8;
}

.codes-empty svg {
  color: var(--yellow);
  opacity: 0.7;
  margin-bottom: 6px;
}

.codes-empty p {
  font-size: 1rem;
  font-weight: 700;
  color: #c4cee0;
}

.codes-empty span {
  font-size: 0.86rem;
  max-width: 38ch;
}

/* Grille */
.codes-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
}

.ccard {
  background: rgba(14, 28, 62, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 22px 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.2s, transform 0.2s;
}

.ccard:hover {
  border-color: rgba(252, 229, 0, 0.35);
  transform: translateY(-2px);
}

.ccard--expired {
  opacity: 0.62;
}

.ccard--expired:hover {
  border-color: rgba(255, 255, 255, 0.1);
  transform: none;
}

.ccard-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ccard-cat {
  font-size: 0.64rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--blue-l1);
}

.ccard-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 100px;
}

.ccard-status .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.ccard-status.is-valid {
  background: rgba(74, 222, 128, 0.12);
  color: #6ee7a0;
}

.ccard-status.is-valid .dot {
  background: #4ade80;
  box-shadow: 0 0 8px rgba(74, 222, 128, 0.7);
}

.ccard-status.is-expired {
  background: rgba(255, 255, 255, 0.06);
  color: #94a3c4;
}

.ccard-status.is-expired .dot {
  background: #94a3c4;
}

.ccard-pack {
  font-size: 1.1rem;
  font-weight: 800;
}

/* Le code */
.ccard-code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: rgba(0, 0, 0, 0.28);
  border: 1px dashed rgba(252, 229, 0, 0.4);
  border-radius: 12px;
  padding: 13px 16px;
  width: 100%;
  text-align: left;
  transition: background 0.2s, border-color 0.2s;
}

.ccard-code:hover {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(252, 229, 0, 0.7);
}

.ccard-code-value {
  font-size: 1.12rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--yellow);
}

.ccard-copy {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9fb0d4;
  flex-shrink: 0;
}

.ccard--expired .ccard-code {
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.12);
}

.ccard--expired .ccard-code-value {
  color: #c4cee0;
  text-decoration: line-through;
}

/* Pied de carte */
.ccard-foot {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.ccard-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.ccard-meta-k {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b7ea8;
}

.ccard-meta-v {
  font-size: 0.8rem;
  color: #c4cee0;
}

@media (max-width: 820px) {
  .profile-main {
    padding-top: 96px;
  }

  .profile-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .profile-stats {
    width: 100%;
  }

  .codes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
