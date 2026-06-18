<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { Form } from '@adonisjs/inertia/vue'
import MichelinAuthLayout from '~/layouts/michelin-auth.vue'
import AuthFormField from '~/components/Auth/AuthFormField.vue'
import AuthPanel from '~/components/Auth/AuthPanel.vue'
import SiteHeader from '~/components/Shared/SiteHeader.vue'

defineOptions({
  layout: MichelinAuthLayout,
})
</script>

<template>
  <Head title="Inscription — Michelin" />

  <div class="mauth-page">
    <SiteHeader />

    <main class="mauth-main wrap">
      <section class="mauth-intro">
        <span class="mauth-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="13" height="13">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          Nouvelle récompense débloquée
        </span>
        <h1 class="titling mauth-title">
          <span>Rejoins</span>
          <span><span class="y">l'aventure.</span></span>
        </h1>
        <p class="mauth-lede">
          Crée ton compte pour accéder aux drops exclusifs réservés aux finishers Michelin. Stock limité, accès 48h.
        </p>
      </section>

      <AuthPanel title="Inscription" subtitle="Remplis tes informations pour activer ton accès finisher.">
        <Form route="session.registerStore" #default="{ processing, errors }">
          <div class="mauth-fields">
            <div class="mauth-name-row">
              <AuthFormField
                label="Prénom"
                name="firstName"
                type="text"
                placeholder="Jean"
                autocomplete="given-name"
                :error="errors.firstName"
              />
              <AuthFormField
                label="Nom"
                name="lastName"
                type="text"
                placeholder="Dupont"
                autocomplete="family-name"
                :error="errors.lastName"
              />
            </div>
            <AuthFormField
              label="Email"
              name="email"
              type="email"
              placeholder="ton@email.com"
              autocomplete="username"
              :error="errors.email"
            />
            <AuthFormField
              label="Mot de passe"
              name="password"
              type="password"
              placeholder="8 caractères minimum"
              autocomplete="new-password"
              :error="errors.password"
            />
            <AuthFormField
              label="Confirmer le mot de passe"
              name="passwordConfirmation"
              type="password"
              placeholder="••••••••"
              autocomplete="new-password"
              :error="errors.passwordConfirmation"
            />

            <button type="submit" class="buy mauth-submit" :disabled="processing">
              <svg v-if="!processing" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="16" height="16">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{{ processing ? 'Création…' : 'Créer mon compte' }}</span>
            </button>

            <p class="mauth-switch">
              Déjà finisher inscrit ?
              <Link href="/login" class="mauth-switch-link">Se connecter</Link>
            </p>
          </div>
        </Form>
      </AuthPanel>
    </main>
  </div>
</template>

<style scoped>
.mauth-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

.mauth-main {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 440px;
  gap: 80px;
  align-items: center;
  padding-top: 116px;
  padding-bottom: 80px;
}

.mauth-intro {
  max-width: 540px;
}

.mauth-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(252, 229, 0, 0.12);
  border: 1px solid rgba(252, 229, 0, 0.45);
  color: #fff;
  border-radius: 100px;
  padding: 7px 15px;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 28px;
}

.mauth-title {
  font-size: clamp(2.6rem, 6vw, 5rem);
  line-height: 0.92;
  margin-bottom: 28px;
}

.mauth-title span {
  display: block;
}

.mauth-lede {
  color: #9fb0d4;
  font-size: 1.04rem;
  line-height: 1.6;
  max-width: 36ch;
}

.mauth-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mauth-name-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mauth-submit {
  width: 100%;
  margin-top: 8px;
  font-size: 0.96rem;
}

.mauth-switch {
  text-align: center;
  font-size: 0.82rem;
  color: #6b7ea8;
}

.mauth-switch-link {
  color: #a0b4d8;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}

.mauth-switch-link:hover {
  color: var(--yellow);
}

@media (max-width: 820px) {
  .mauth-main {
    grid-template-columns: 1fr;
    gap: 40px;
    padding-top: 32px;
  }

  .mauth-title {
    font-size: clamp(2.2rem, 9vw, 3.5rem);
  }

  .mauth-name-row {
    grid-template-columns: 1fr;
  }
}
</style>
