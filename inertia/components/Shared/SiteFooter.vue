<template>
  <footer id="footer" class="relative z-[100] bg-[#1C3C77] text-white pt-16 pb-28">
    <div class="mx-auto max-w-[1280px] px-7">
      
      <div class="flex flex-col md:flex-row items-start md:items-center gap-9 pb-8 border-b border-white/10">
        <div class="w-[84px] h-[108px] shrink-0 rounded-xl flex items-center justify-center text-center text-[0.58rem] text-[#7e8eb4] font-mono leading-relaxed" style="background: repeating-linear-gradient(135deg, rgba(255,255,255,.06) 0 14px, rgba(255,255,255,.02) 14px 28px);">
          BIBENDUM<br>pose<br>« Hello »
        </div>
        <div class="flex-1">
          <div class="text-[1.35rem] font-black tracking-tight mb-1 text-white">À bientôt sur les chemins.</div>
          <div class="text-[#9fb0d4] text-[0.92rem] max-w-[38ch]">Michelin Unlock &amp; Ride — la performance qui débloque la récompense.</div>
        </div>
        <button class="px-5 py-3 rounded-xl border-2 border-white/30 text-white font-bold text-sm hover:border-white hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer" @click="$emit('back-to-pack')">
          Revenir au pack
        </button>
      </div>
      
      <div class="flex flex-wrap gap-x-6 gap-y-2 pt-6 text-[0.82rem] text-[#9fb0d4]">
        <a href="#" class="hover:text-white transition-colors">Mentions légales</a>
        <a href="#" class="hover:text-white transition-colors">Conditions de l'offre Drop</a>
        <a href="#" class="hover:text-white transition-colors">Confidentialité</a>
        <a href="#" class="hover:text-white transition-colors">Cookies</a>
        <a href="#" class="hover:text-white transition-colors">Livraison &amp; retours</a>
        <a href="#" class="hover:text-white transition-colors">Contact</a>
      </div>
      
      <p class="mt-5 text-[0.73rem] text-[#6b7ea8] leading-[1.6] max-w-[96ch]">
        Offre « Drop Finisher » réservée aux participants ayant validé le Défi Michelin Gravel 100 km, dans la limite des stocks disponibles et jusqu'à expiration du lien (48 h). Visuels produits non contractuels. La casquette Finisher est une édition limitée non commercialisée en réseau. © {{ currentYear }} Manufacture Française des Pneumatiques Michelin — concept de démonstration. Logo MICHELIN et personnage Bibendum™ : marques déposées, emplacements réservés aux assets officiels du Brands Center.
      </p>
      
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

defineEmits(['back-to-pack'])
</script>