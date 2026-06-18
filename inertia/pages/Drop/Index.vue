<template>
  <div id="michelin-drop-page">
    <!-- Éléments de fond natifs du prototype -->
    <div id="bg"></div>
    <canvas ref="glCanvas" id="gl"></canvas>
    <div id="gl-fallback" v-if="hasGlError">
      <div class="fallback-tire"></div>
    </div>

    <!-- Loader Écran -->
    <div class="loader" :class="{ done: !isLoading }">
      <div>
        <div class="ring"></div>
        <div class="lt">MICHELIN · UNLOCK &amp; RIDE</div>
      </div>
    </div>

    <!-- Menu supérieur -->
    <SiteHeader :scrolled="scrolled" :cartCount="cartCount" @cart-click="go('#pack')" />

    <main>
      <!-- HERO SECTION -->
      <section class="hero" id="hero" data-reveal>
        <div class="wrap">
          <span class="badge reveal">
            <svg class="lk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              <rect x="4" y="11" width="16" height="10" rx="2" />
            </svg>
            Défi Michelin Gravel 100 — validé · récompense débloquée
          </span>
          <h1 class="titling">
            <span class="kin"><span>Tu as roulé.</span></span>
            <span class="kin"><span>Le <span class="y">Drop</span> s'ouvre.</span></span>
          </h1>
          <div class="hero-foot">
            <p class="hero-lede reveal d2">
              Un lien unique, un stock limité, un tarif réservé aux finishers. 48 heures, puis
              l'accès se referme.
            </p>
            <div class="ride-strip reveal d3">
              <div class="rs hl">
                <div class="k">Distance</div>
                <div class="v"><span>104.2</span><small>km</small></div>
              </div>
              <div class="rs">
                <div class="k">Dénivelé +</div>
                <div class="v"><span>1240</span><small>m</small></div>
              </div>
              <div class="rs">
                <div class="k">Temps</div>
                <div class="v">4:12:38</div>
              </div>
            </div>
          </div>
        </div>
        <div class="scrollhint"><span class="m"></span>Scrolle</div>
      </section>

      <!-- STORY SECTION -->
      <section class="story" data-reveal>
        <div class="wrap">
          <div class="story-grid">
            <div>
              <span class="eyebrow" style="color: var(--blue)">L'effort accompli</span>
              <h2><span class="y">100 km</span> de pure intensité.</h2>
              <p class="p">
                Tu as bravé la poussière, le vent et les chemins exigeants. Chaque coup de pédale
                t'a rapproché de cette récompense exclusive. Découvre la gamme qui a rendu cet
                exploit possible.
              </p>
            </div>
            <div class="wrap-trace">
              <div class="trace">
                <span class="lbl">Trace GPS validée</span>
                <svg viewBox="0 0 400 400" class="w-full h-full">
                  <path class="route"
                    d="M 50,200 C 80,100 150,50 200,150 C 250,250 320,100 350,200 C 320,300 250,350 200,250 C 150,150 80,300 50,200 Z" />
                  <circle cx="50" cy="200" r="6" class="pin" />
                  <circle cx="350" cy="200" r="6" class="pin" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STAGE SECTION (3D Showcase) -->
      <section class="stage" id="stage">
        <div class="stage-sticky">
          <div class="stage-top">
            <span class="eyebrow">Michelin · Gamme Performance</span>
            <h2 class="titling">Choisis ton terrain.</h2>
            <div class="tire-switch">
              <button v-for="(t, i) in tires" :key="t.id" :class="{ on: tireIdx === i }" @click="selectTire(i)">
                <span class="tn">{{ t.name }}</span>
                <span class="tc">{{ t.cat }}</span>
              </button>
            </div>
          </div>

          <div class="anno a1" :class="{ on: annoIdx >= 0 }">
            <div class="tn">{{ tire.benefits[0].tn }}</div>
            <h4>{{ tire.benefits[0].h }}</h4>
            <p>{{ tire.benefits[0].p }}</p>
          </div>

          <div class="anno a2" :class="{ on: annoIdx >= 1 }">
            <div class="tn">{{ tire.benefits[1].tn }}</div>
            <h4>{{ tire.benefits[1].h }}</h4>
            <p>{{ tire.benefits[1].p }}</p>
          </div>

          <div class="anno a3" :class="{ on: annoIdx >= 2 }">
            <div class="tn">{{ tire.benefits[2].tn }}</div>
            <h4>{{ tire.benefits[2].h }}</h4>
            <p>{{ tire.benefits[2].p }}</p>
          </div>

          <!-- Le prix au pied de la roue -->
          <div class="stage-foot">
            <span class="sf-price">{{ tire.name }} · dès <b>{{ fmt(tire.price) }}</b></span>
            <button class="sf-btn" @click="go('#pack')">Voir le pack</button>
          </div>

          <div class="stage-prog">
            <i :class="{ on: annoIdx >= 0 }"></i>
            <i :class="{ on: annoIdx >= 1 }"></i>
            <i :class="{ on: annoIdx >= 2 }"></i>
          </div>
        </div>
      </section>

      <!-- SPECS SECTION -->
      <section class="specs" id="specs" data-reveal>
        <div class="wrap">
          <div class="sh">
            <div>
              <span class="eyebrow">{{ tire.name }} · fiche technique</span>
              <h2 class="titling reveal" style="margin-top: 14px">
                Les chiffres,<br />sans le jargon.
              </h2>
            </div>
            <p class="reveal d2">{{ tire.blurb }}</p>
          </div>
          <div class="spec-row reveal d2">
            <div class="spec">
              <div class="sv">{{ tire.section }}</div>
              <div class="sk">Section</div>
            </div>
            <div class="spec">
              <div class="sv">{{ tire.weight }} g</div>
              <div class="sk">Poids</div>
            </div>
            <div class="spec">
              <div class="sv">{{ tire.tpi }}</div>
              <div class="sk">Tringle / TPI</div>
            </div>
            <div class="spec">
              <div class="sv">{{ tire.mount }}</div>
              <div class="sk">Montage</div>
            </div>
            <div class="spec">
              <div class="sv">{{ tire.pressure }}</div>
              <div class="sk">Pression (bar)</div>
            </div>
          </div>
        </div>
      </section>

      <!-- PACK SECTION -->
      <section class="pack" id="pack" data-reveal>
        <div class="wrap">
          <div class="ph-head">
            <span class="eyebrow">Le pack Finisher · Drop #2 Gravel</span>
            <h2 class="titling reveal">Tout pour reprendre la route.</h2>
            <p class="reveal d2">
              Trois produits assemblés pour ta saison. Disponible uniquement via ce lien, jusqu'à la
              fermeture du Drop.
            </p>
          </div>

          <div class="ticket reveal d2">
            <aside class="ticket-stub">
              <div class="stub-head">
                <span class="stub-drop mono">DROP <b>02</b></span>
                <span class="stub-ed">Édition Finisher · Gravel</span>
              </div>
              <div class="stub-photo">
                <span class="cm tl"></span><span class="cm tr"></span><span class="cm bl"></span><span
                  class="cm br"></span>
                <span class="stub-lbl">PACKSHOT<br />2 pneus + 2 chambres<br />+ casquette Finisher</span>
              </div>
              <div class="stub-foot mono">RÉF · MUR-DROP02-{{ tire.id.toUpperCase() }}</div>
            </aside>

            <span class="perf"><i class="notch t"></i><i class="notch b"></i></span>

            <div class="ticket-body">
              <header class="tk-head">
                <div>
                  <span class="eyebrow" style="color: var(--blue)">Pack Finisher · accès réservé</span>
                  <h3>Pack {{ tire.name }}</h3>
                </div>
                <span class="tk-no mono">48 H</span>
              </header>

              <ol class="tk-list">
                <li class="in">
                  <span class="li-no">01</span>
                  <div class="li-main">
                    <span class="li-nm">MICHELIN {{ tire.name }}</span><span class="li-sub">{{ tire.section }} ·
                      Tubeless Ready · {{ tire.cat }}</span>
                  </div>
                  <span class="li-q">×2</span>
                </li>
                <li class="in">
                  <span class="li-no">02</span>
                  <div class="li-main">
                    <span class="li-nm">MICHELIN Air Stop</span><span class="li-sub">Chambre à air renforcée · valve
                      Presta 40 mm</span>
                  </div>
                  <span class="li-q">×2</span>
                </li>
                <li class="in">
                  <span class="li-no">03</span>
                  <div class="li-main">
                    <span class="li-nm">Casquette Michelin Finisher</span><span class="li-sub">Édition limitée — non
                      vendue en magasin</span>
                  </div>
                  <span class="li-q">×1</span>
                </li>
              </ol>

              <div class="tk-opt">
                <span class="ol">Couleur de la casquette</span>
                <div class="sws">
                  <button v-for="c in caps" :key="c.id" class="sw" :class="{ on: cap === c.id }" @click="cap = c.id">
                    <span class="chip" :style="{ background: c.hex }"></span>{{ c.name }}
                  </button>
                </div>
              </div>

              <div class="tk-bottom">
                <div class="tk-qty">
                  <span class="ol">Quantité</span>
                  <div class="stepper">
                    <button @click="dec" :disabled="qty <= 1">−</button>
                    <span class="n">{{ qty }}</span>
                    <button @click="inc" :disabled="qty >= 3">+</button>
                  </div>
                </div>
                <div class="tk-price">
                  <div class="seal">−{{ pct }}%<small>FINISHER</small></div>
                  <div class="pr">
                    <span class="was">{{ fmt(unitWas * qty) }}</span>
                    <span class="now mono">{{ fmt(unitPrice * qty) }}</span>
                  </div>
                </div>
              </div>

              <button class="buy" @click="addToCart">
                Acheter maintenant — {{ fmt(unitPrice * qty) }}
              </button>
              <p class="tk-foot">
                Soit {{ fmt((unitWas - unitPrice) * qty) }} d’économie sur le tarif public ·
                livraison incluse · paiement sécurisé · max 3 packs par finisher.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- TRUST SECTION -->
      <section class="trust" data-reveal>
        <div class="wrap">
          <div class="trust-head">
            <div>
              <span class="eyebrow">Engagements Michelin</span>
              <h2>Roulez l'esprit libre.</h2>
            </div>
            <p>
              Parce que la performance ne vaut rien sans la fiabilité, nous concevons nos produits
              pour répondre aux exigences les plus extrêmes.
            </p>
          </div>
          <div class="trust-grid">
            <div class="tcard">
              <div class="ic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCE500" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h5>Garantie Finisher</h5>
              <p>Accès exclusif et prioritaire sur les séries limitées non commercialisées.</p>
            </div>
            <div class="tcard">
              <div class="ic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCE500" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h5>Qualité Certifiée</h5>
              <p>Chaque pneu est inspecté manuellement dans nos usines françaises.</p>
            </div>
            <div class="tcard">
              <div class="ic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCE500" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
                  <path d="M16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h5>Livraison Express</h5>
              <p>Expédié sous 24h par notre partenaire AllTricks directement chez vous.</p>
            </div>
            <div class="tcard">
              <div class="ic">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FCE500" stroke-width="2">
                  <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.38 0 0 1 8 8v.5z" />
                </svg>
              </div>
              <h5>Support Expert</h5>
              <p>Une équipe de techniciens passionnés pour répondre à vos questions de montage.</p>
            </div>
          </div>
          <div class="trust-cta">
            <div class="tcl">
              <b>Prêt à débloquer ton pack ?</b>
              <span>Ton code de réduction unique expire dans moins de 48 heures.</span>
            </div>
            <button @click="go('#pack')">Obtenir mon offre</button>
          </div>
        </div>
      </section>

      <SiteFooter @back-to-pack="go('#pack')" />
    </main>

    <!-- STICKY BOTTOM BAR (BNB) -->
    <div class="bnb" :class="{ show: showBnb }">
      <div class="wrap bnb-in">
        <div class="pr">
          <span class="pn">{{ tire.name }}</span>
          <span class="pl">Pack Finisher réservé · <b>{{ fmt(unitPrice * qty) }}</b></span>
        </div>
        <button class="bbtn" @click="addToCart">
          Profiter de mon offre <span class="dot">{{ qty }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick, defineComponent } from 'vue'
import Lenis from 'lenis'
import SiteHeader from '~/components/Shared/SiteHeader.vue'
import SiteFooter from '~/components/Shared/SiteFooter.vue'
import { MichelinThreeScene } from '~/utils/three_tire_generator'

defineOptions({
  layout: defineComponent({
    render() {
      return this.$slots.default ? this.$slots.default() : null
    },
  }),
})

const isLoading = ref(true)
const scrolled = ref(false)
const showBnb = ref(false)
const hasGlError = ref(false)
const glCanvas = ref<HTMLCanvasElement | null>(null)
let threeScene: MichelinThreeScene | null = null
let lenis: Lenis | null = null

const tires = [
  {
    id: 'gravel',
    name: 'Power Gravel',
    cat: 'Gravel / Mixte',
    price: 129,
    was: 189,
    width: 0.2,
    tread: 'gravel',
    section: '700×35C',
    weight: 415,
    tpi: '3×120',
    mount: 'TLR',
    pressure: '2.5–5',
    blurb:
      '700×35C, montage tubeless ready. Léger pour relancer, costaud pour durer sur tous les chemins.',
    benefits: [
      {
        tn: 'Gomme MAGI-X',
        h: 'Accroche sèche, freinage court',
        p: 'Une gomme qui mord le terrain même quand le chemin se dérobe. Tu poses la roue où tu veux, tu freines tard.',
      },
      {
        tn: 'Bead to Bead Shield',
        h: 'Protégé d’un flanc à l’autre',
        p: 'Une armure intégrale qui couvre toute la carcasse. Moins de crevaisons sur cailloux, plus de bornes avalées.',
      },
      {
        tn: 'Polyvalence',
        h: 'Un seul pneu, toute la saison',
        p: 'Asphalte, chemin damé, terrain mixte : il enchaîne tout. Tu montes une fois, tu roules partout.',
      },
    ],
  },
  {
    id: 'cup',
    name: 'Power Cup',
    cat: 'Route / Compétition',
    price: 159,
    was: 229,
    width: 0.13,
    tread: 'slick',
    section: '700×28C',
    weight: 225,
    tpi: '4×180',
    mount: 'TLR',
    pressure: '5–8',
    blurb:
      '700×28C, gomme compétition. Le rendement d’un pneu de course homologué pour le peloton pro.',
    benefits: [
      {
        tn: 'Gomme X-Race',
        h: 'Vitesse et grip à sec',
        p: 'La gomme de compétition Michelin : rendement maximal sur route sèche, sans rien lâcher en virage.',
      },
      {
        tn: 'Tubeless Shield',
        h: 'Léger, protégé, serein',
        p: 'Une protection course intégrée sans alourdir le pneu. Tu envoies les watts, tu oublies la crevaison.',
      },
      {
        tn: 'Profil compétition',
        h: 'Pensé pour la performance',
        p: 'Section optimisée pour fendre l’air et relancer. Chaque coup de pédale part dans l’avancement.',
      },
    ],
  },
  {
    id: 'cx',
    name: 'Power Cyclocross Mud',
    cat: 'Cyclocross / Boue',
    price: 139,
    was: 199,
    width: 0.22,
    tread: 'cx',
    section: '700×33C',
    weight: 430,
    tpi: '3×120',
    mount: 'TLR',
    pressure: '1.6–3',
    blurb:
      '700×33C, crampons agressifs. Conçu pour les terrains gras et la boue profonde de l’hiver.',
    benefits: [
      {
        tn: 'Crampons Mud',
        h: 'Mord la boue, s’auto-nettoie',
        p: 'Des crampons hauts et espacés qui plantent dans le gras et se débourrent tout seuls à chaque tour de roue.',
      },
      {
        tn: 'Gomme tendre',
        h: 'Grip par tous les temps',
        p: 'Une gomme pensée pour le froid et l’humidité du cyclocross hivernal. L’accroche reste là quand les autres décrochent.',
      },
      {
        tn: 'Carcasse souple',
        h: 'Basse pression, max contact',
        p: 'Roule à très basse pression pour épouser le terrain et maximiser la surface d’accroche au sol.',
      },
    ],
  },
]

const tireIdx = ref(0)
const tire = computed(() => tires[tireIdx.value])

const annoIdx = ref(-1)

const caps = [
  { id: 'jaune', name: 'Jaune Michelin', hex: '#FCE500' },
  { id: 'bleu', name: 'Bleu nuit', hex: '#00205B' },
  { id: 'blanc', name: 'Blanc', hex: '#F2F2F2' },
]
const cap = ref('jaune')
const qty = ref(1)
const cartCount = ref(0)
const unitWas = computed(() => tire.value.was)
const unitPrice = computed(() => tire.value.price)
const pct = computed(() => Math.round((1 - tire.value.price / tire.value.was) * 100))

const inc = () => {
  if (qty.value < 3) qty.value++
}
const dec = () => {
  if (qty.value > 1) qty.value--
}
const fmt = (n: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(n)

const toast = ref(false)
const toastMsg = ref('')

const addToCart = () => {
  const dropToken = 'MICH-DROP-2-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  cartCount.value += qty.value
  toastMsg.value = 'Redirection vers la caisse partenaire...'
  toast.value = true

  setTimeout(() => {
    window.location.href = `https://www.alltricks.fr/C-40698-pneus?promo_code=${dropToken}&ref=michelin_unlock`
  }, 1200)
}

const selectTire = (index: number) => {
  tireIdx.value = index
}

watch(tireIdx, () => {
  if (threeScene) {
    threeScene.setTire(tires[tireIdx.value])
  }
})

const go = (sel: string) => {
  const el = document.querySelector(sel)
  if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -40 })
}

onMounted(async () => {
  await nextTick()

  if (glCanvas.value) {
    threeScene = new MichelinThreeScene(glCanvas.value)
    const ok = threeScene.init()
    if (!ok) {
      hasGlError.value = true
    } else {
      threeScene.setTire(tires[tireIdx.value])
    }
  }

  lenis = new Lenis({ lerp: 0.085, smoothWheel: true })

  const frame = (time: number) => {
    if (lenis) {
      lenis.raf(time)
      scrolled.value = window.scrollY > 40

      // Gère l'affichage de la BNB du bas selon le scroll
      showBnb.value = window.scrollY > window.innerHeight * 1.5

      const stageEl = document.getElementById('stage')
      if (stageEl && threeScene) {
        const r = stageEl.getBoundingClientRect()
        const pin = stageEl.offsetHeight - window.innerHeight
        const sp = Math.min(1, Math.max(0, -r.top / pin))

        // Calcule précisément l'index de l'annotation à afficher (0, 1 ou 2)
        annoIdx.value = sp < 0.04 ? -1 : sp < 0.42 ? 0 : sp < 0.74 ? 1 : 2

        threeScene.updateScroll(sp * Math.PI * 1.25)
      }
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)

  const handleResize = () => {
    if (threeScene) threeScene.resize()
  }
  const handlePointer = (e: PointerEvent) => {
    if (threeScene) threeScene.updatePointer(e.clientX, e.clientY)
  }

  window.addEventListener('resize', handleResize)
  window.addEventListener('pointermove', handlePointer)

  // Configuration des observateurs de reveal comme sur index.html
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in')
          io.unobserve(en.target)
        }
      })
    },
    { threshold: 0.16 }
  )
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))

  setTimeout(() => (isLoading.value = false), 650)
})

onUnmounted(() => {
  if (lenis) lenis.destroy()
  if (threeScene) threeScene.dispose()
  window.removeEventListener('resize', () => { })
  window.removeEventListener('pointermove', () => { })
})
</script>
