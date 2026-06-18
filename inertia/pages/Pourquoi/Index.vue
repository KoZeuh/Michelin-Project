<template>
  <div id="michelin-pourquoi-page">
    <div id="bg"></div>
    <canvas ref="glCanvas" id="gl"></canvas>
    <div id="gl-fallback" v-if="hasGlError">
      <div class="fallback-tire"></div>
    </div>

    <div class="loader" :class="{ done: !isLoading }">
      <div>
        <div class="ring"></div>
        <div class="lt">MICHELIN</div>
      </div>
    </div>

    <SiteHeader :scrolled="scrolled" :cartCount="0" @cart-click="goToDrop" @nav-stage="goToDrop" />

    <main>
      <section class="hero" id="hero" data-reveal>
        <div class="wrap">
          <span class="badge reveal">Conseil d'expert · choisir son pneu</span>
          <h1 class="titling">
            <span class="kin"><span>Le pneu, c'est</span></span>
            <span class="kin"><span>le <span class="y">seul</span> contact</span></span>
            <span class="kin"><span>avec la route.</span></span>
          </h1>
          <p class="lede reveal d2">
            Quatre paumes de main de gomme vous relient au sol. C'est là que tout se joue :
            l'adhérence dans un virage mouillé, les kilomètres que vous tiendrez, la crevaison que
            vous éviterez. Voilà pourquoi le choix d'un pneu n'est jamais un détail.
          </p>
          <div class="actions reveal d3">
            <button class="btn-y" @click="go('#manifesto')">
              Découvrir pourquoi
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </button>
            <button class="btn-ghost" @click="goToDrop">Voir l'offre Finisher</button>
          </div>
        </div>
        <div class="scrollhint"><span class="m"></span>Défiler</div>
      </section>

      <section class="manifesto" id="manifesto" data-reveal>
        <div class="wrap">
          <span class="eyebrow">La philosophie Michelin</span>
          <h2 class="titling reveal">
            Ne jamais sacrifier <span class="b">une performance</span> pour une autre.
          </h2>
          <div class="mani-grid">
            <div class="reveal d2">
              <p>
                La plupart des pneus vous demandent de choisir : l'adhérence <em>ou</em> la
                longévité, la vitesse <em>ou</em> la sécurité. Michelin refuse ce compromis. C'est
                le principe de la <strong>Total Performance</strong> : faire progresser tous les
                critères à la fois, génération après génération.
              </p>
              <p>
                Concrètement, votre pneu accroche mieux, dure plus longtemps et roule plus
                efficacement — sans qu'aucune de ces qualités ne se fasse au détriment des autres.
                C'est ce qui distingue un pneu pensé par des ingénieurs d'un pneu pensé par un
                tableur.
              </p>
            </div>
            <div class="mani-note reveal d3">
              <div class="t">Ce que ça change pour vous</div>
              <p>
                Un pneu qui tient la distance vous coûte moins cher au kilomètre. Un pneu qui
                accroche vous garde debout. Un pneu qui roule bien préserve vos jambes. La
                performance n'est pas un luxe : c'est ce qui rend chaque sortie plus sûre et plus
                agréable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="pillars" id="pillars" data-reveal>
        <div class="wrap">
          <div class="head">
            <span class="eyebrow">Trois raisons concrètes</span>
            <h2 class="titling reveal">Pourquoi ça se sent dès le premier tour de roue.</h2>
            <p class="reveal d2">
              Pas de promesses abstraites — voici ce que vous ressentez réellement sous la selle.
            </p>
          </div>
          <div class="pil-grid reveal d2">
            <div class="pil">
              <span class="no">01</span>
              <div class="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FCE500" stroke-width="2">
                  <path d="M3 17c3 0 3-10 6-10s3 10 6 10 3-6 6-6" />
                  <path d="M3 21h18" />
                </svg>
              </div>
              <h3>Adhérence</h3>
              <p>
                Les gommes haute performance Michelin mordent le sol, même mouillé ou meuble. Vous
                freinez plus court, vous inclinez plus serein, vous gardez le contrôle quand le
                revêtement change.
              </p>
            </div>
            <div class="pil">
              <span class="no">02</span>
              <div class="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FCE500" stroke-width="2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </div>
              <h3>Longévité</h3>
              <p>
                Conçu pour durer, un pneu Michelin garde ses qualités jusqu'à l'usure. Moins de
                remplacements, un meilleur coût au kilomètre, et la même sécurité du premier au
                dernier jour.
              </p>
            </div>
            <div class="pil">
              <span class="no">03</span>
              <div class="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FCE500" stroke-width="2">
                  <path d="M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5l-8-3Z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3>Sérénité</h3>
              <p>
                Les technologies de protection limitent les crevaisons sur cailloux et débris. Vous
                partez plus loin l'esprit léger, en pensant au paysage plutôt qu'à la rustine.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="tech" id="tech" data-reveal>
        <div class="wrap">
          <div class="head">
            <div>
              <span class="eyebrow">Les technologies</span>
              <h2 class="titling reveal">L'ingénierie qui fait la différence.</h2>
            </div>
            <p class="reveal d2">
              Chaque innovation répond à un besoin précis du cycliste. Voici les principales, en
              clair.
            </p>
          </div>
          <div class="tech-list reveal d2">
            <div class="trow">
              <div class="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                  <path d="M3 17c3 0 3-10 6-10s3 10 6 10 3-6 6-6" />
                </svg>
              </div>
              <div>
                <div class="tn">Gomme MAGI-X</div>
                <h4>L'accroche, poussée à son maximum</h4>
                <p>
                  Une gomme tendre haute adhérence pensée pour le gravel et le tout-chemin : grip
                  sur sol sec comme meuble, et freinage net.
                </p>
              </div>
            </div>
            <div class="trow">
              <div class="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                  <path d="M12 2 4 5v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V5l-8-3Z" />
                </svg>
              </div>
              <div>
                <div class="tn">Bead to Bead Shield</div>
                <h4>Une protection d'un flanc à l'autre</h4>
                <p>
                  Une armure qui couvre toute la carcasse, de tringle à tringle. Bien plus de
                  résistance aux coupures et crevaisons sur terrain cassant.
                </p>
              </div>
            </div>
            <div class="trow">
              <div class="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              <div>
                <div class="tn">Gomme X-Race</div>
                <h4>Le rendement de la compétition</h4>
                <p>
                  Issue du haut niveau, cette gomme route privilégie la vitesse et le grip à sec —
                  pour transformer chaque watt en avancement.
                </p>
              </div>
            </div>
            <div class="trow">
              <div class="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <div class="tn">Tubeless Ready</div>
                <h4>Moins de crevaisons, basse pression</h4>
                <p>
                  Le montage sans chambre permet de rouler à plus basse pression : plus de confort,
                  plus d'accroche, et le préventif qui colmate les petites perforations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="compare" id="compare" data-reveal>
        <div class="wrap">
          <div class="head">
            <span class="eyebrow">Premium vs entrée de gamme</span>
            <h2 class="titling reveal">Le même vélo. Pas la même sortie.</h2>
            <p class="reveal d2">
              À budget de vélo équivalent, le pneu est l'amélioration la plus rentable. Voici ce qui
              change vraiment.
            </p>
          </div>
          <div class="ctable reveal d2">
            <div class="crow h">
              <div class="crit">Critère</div>
              <div class="h-mich">Pneu Michelin premium</div>
              <div class="h-other">Pneu d'entrée de gamme</div>
            </div>
            <div class="crow">
              <div class="crit">Adhérence sur sol mouillé</div>
              <div class="cell mich">
                <span class="chk"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000"
                    stroke-width="3.2">
                    <path d="M20 6 9 17l-5-5" />
                  </svg></span>Gommes haute performance
              </div>
              <div class="cell other"><span class="dot">~</span>Variable, souvent en retrait</div>
            </div>
            <div class="crow">
              <div class="crit">Longévité / coût au km</div>
              <div class="cell mich">
                <span class="chk"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000"
                    stroke-width="3.2">
                    <path d="M20 6 9 17l-5-5" />
                  </svg></span>Conçu pour durer
              </div>
              <div class="cell other"><span class="dot">~</span>Usure plus rapide</div>
            </div>
            <div class="crow">
              <div class="crit">Protection anti-crevaison</div>
              <div class="cell mich">
                <span class="chk"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000"
                    stroke-width="3.2">
                    <path d="M20 6 9 17l-5-5" />
                  </svg></span>Bead to Bead Shield
              </div>
              <div class="cell other"><span class="dot">—</span>Souvent absente</div>
            </div>
            <div class="crow">
              <div class="crit">Rendement / relance</div>
              <div class="cell mich">
                <span class="chk"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#000"
                    stroke-width="3.2">
                    <path d="M20 6 9 17l-5-5" />
                  </svg></span>Optimisé en soufflerie
              </div>
              <div class="cell other"><span class="dot">~</span>Pénalisant sur la durée</div>
            </div>
          </div>
        </div>
      </section>

      <section class="heritage" id="heritage" data-reveal>
        <div class="wrap">
          <span class="eyebrow">L'héritage</span>
          <h2 class="titling reveal">Plus d'un siècle à réinventer le pneu.</h2>
          <div class="timeline reveal d2">
            <div class="tl">
              <div class="yr">1889</div>
              <h4>Clermont-Ferrand</h4>
              <p>
                Naissance de Michelin, déjà au service de ceux qui roulent — à commencer par le
                vélo.
              </p>
            </div>
            <div class="tl">
              <div class="yr">1898</div>
              <h4>Bibendum</h4>
              <p>
                Le Bonhomme Michelin voit le jour : un siècle plus tard, il reste l'un des symboles
                les plus connus au monde.
              </p>
            </div>
            <div class="tl">
              <div class="yr">1946</div>
              <h4>Le pneu radial</h4>
              <p>
                Michelin invente le pneu à carcasse radiale, une rupture qui redéfinit l'adhérence
                et la longévité.
              </p>
            </div>
            <div class="tl">
              <div class="yr">Aujourd'hui</div>
              <h4>La compétition</h4>
              <p>
                Des décennies de victoires nourrissent une R&D qui descend directement jusqu'à votre
                pneu de série.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-band" data-reveal>
        <div class="wrap cta-in">
          <div class="reveal">
            <h2 class="titling">Prêt à sentir <span class="y">la différence</span> ?</h2>
            <p class="reveal d2">
              Votre pack Finisher vous attend — accès réservé, édition limitée.
            </p>
          </div>
          <button class="btn-y reveal d2" @click="goToDrop">
            Débloquer mon pack
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>
    </main>

    <SiteFooter @back-to-pack="goToDrop" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, defineComponent } from 'vue'
import { router } from '@inertiajs/vue3'
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
const hasGlError = ref(false)
const glCanvas = ref<HTMLCanvasElement | null>(null)

let threeScene: MichelinThreeScene | null = null
let lenis: Lenis | null = null

const go = (sel: string) => {
  const el = document.querySelector(sel)
  if (el && lenis) lenis.scrollTo(el as HTMLElement, { offset: -40 })
}

const goToDrop = () => {
  router.visit('/')
}

onMounted(async () => {
  await nextTick()

  // Initialisation de la scène 3D en fond
  if (glCanvas.value) {
    threeScene = new MichelinThreeScene(glCanvas.value)
    const ok = threeScene.init()
    if (!ok) {
      hasGlError.value = true
    } else {
      threeScene.setTire({ id: 'gravel', width: 0.2, tread: 'gravel' })
      const shiftX = window.innerWidth < 820 ? 0 : 1.7
      threeScene.setPivotPositionX(shiftX)
    }
  }

  // Smooth scroll
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true })

  const frame = (time: number) => {
    if (lenis) {
      lenis.raf(time)
      scrolled.value = window.scrollY > 40
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)

  const handleResize = () => {
    if (threeScene) {
      threeScene.resize()
      const shiftX = window.innerWidth < 820 ? 0 : 1.7
      threeScene.setPivotPositionX(shiftX)
    }
  }

  const handlePointer = (e: PointerEvent) => {
    if (threeScene) threeScene.updatePointer(e.clientX, e.clientY)
  }

  window.addEventListener('resize', handleResize)
  window.addEventListener('pointermove', handlePointer)

  // Animations d'apparition
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
