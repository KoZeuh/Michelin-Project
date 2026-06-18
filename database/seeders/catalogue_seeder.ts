import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import Drop from '#models/drop'
import Pack from '#models/pack'
import PackTechnology from '#models/pack_technology'
import Review from '#models/review'
import DropEligibility from '#models/drop_eligibility'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    const drops = await Drop.updateOrCreateMany('slug', [
      {
        slug: 'drop-gravel-02',
        title: 'Gravel Edition',
        expiresAt: DateTime.fromISO('2026-06-19T12:00:00Z'),
      },
      {
        slug: 'drop-route-01',
        title: 'Route Classic',
        expiresAt: DateTime.fromISO('2026-06-20T18:00:00Z'),
      },
      {
        slug: 'drop-urbain-03',
        title: 'Urbain Commuter',
        expiresAt: DateTime.fromISO('2026-06-21T10:00:00Z'),
      },
    ])

    const dropBySlug = Object.fromEntries(drops.map((d) => [d.slug, d]))

    const packs = await Pack.updateOrCreateMany('slug', [
      {
        slug: 'pack-gravel-premium',
        dropId: dropBySlug['drop-gravel-02'].id,
        category: 'GRAVEL',
        name: 'POWER GRAVEL',
        subtitle: 'Pack Gravel – 2 pneus + chambre à air + casquette',
        imageUrl: 'https://images.michelin.com/tires/power-gravel.jpg',
        price: 94.0,
        originalPrice: 142.0,
        discountPercentage: 34,
        stockTotalInitial: 500,
        stockRemainingPercentage: 33,
        description:
          'Conçu pour les terrains mixtes, le Power Gravel offre une accroche exceptionnelle sur route et chemin avec une résistance au roulement ultra-faible.',
      },
      {
        slug: 'pack-gravel-essential',
        dropId: dropBySlug['drop-gravel-02'].id,
        category: 'GRAVEL',
        name: 'ESSENTIAL GRAVEL',
        subtitle: 'Pack Gravel – 2 pneus + bidon Michelin',
        imageUrl: 'https://images.michelin.com/tires/power-gravel-essential.jpg',
        price: 69.0,
        originalPrice: 98.0,
        discountPercentage: 30,
        stockTotalInitial: 500,
        stockRemainingPercentage: 61,
        description:
          "La solution gravel accessible pour commencer l'aventure, sans compromis sur la solidité.",
      },
      {
        slug: 'pack-route-premium',
        dropId: dropBySlug['drop-route-01'].id,
        category: 'ROUTE',
        name: 'POWER ROAD',
        subtitle: 'Pack Route – 2 pneus + chambre à air + casquette',
        imageUrl: 'https://images.michelin.com/tires/power-road.jpg',
        price: 112.0,
        originalPrice: 158.0,
        discountPercentage: 29,
        stockTotalInitial: 300,
        stockRemainingPercentage: 45,
        description:
          'Le meilleur de Michelin sur route : faible résistance, excellent grip par temps sec et mouillé.',
      },
      {
        slug: 'pack-urbain-premium',
        dropId: dropBySlug['drop-urbain-03'].id,
        category: 'URBAIN',
        name: 'CITY JET',
        subtitle: 'Pack Urbain – 2 pneus anti-crevaison + antivol offert',
        imageUrl: 'https://images.michelin.com/tires/city-jet.jpg',
        price: 58.0,
        originalPrice: 82.0,
        discountPercentage: 29,
        stockTotalInitial: 800,
        stockRemainingPercentage: 78,
        description:
          'Taillé pour la ville : résistant aux crevaisons, confortable sur pavés et réactif aux freinages.',
      },
    ])

    const packBySlug = Object.fromEntries(packs.map((p) => [p.slug, p]))

    await PackTechnology.query().delete()

    const technologies = [
      {
        packSlug: 'pack-gravel-premium',
        icon: 'bolt',
        label: 'Résistance au roulement',
        value: 'Ultra-Low (3 sur 5)',
        sortOrder: 0,
      },
      {
        packSlug: 'pack-gravel-premium',
        icon: 'shield',
        label: 'Protection',
        value: 'ProTek+ 5 mm',
        sortOrder: 1,
      },
      {
        packSlug: 'pack-gravel-premium',
        icon: 'straighten',
        label: 'Dimension',
        value: '700x40c / 650b-47',
        sortOrder: 2,
      },

      {
        packSlug: 'pack-gravel-essential',
        icon: 'bolt',
        label: 'Résistance au roulement',
        value: 'Low (4 sur 5)',
        sortOrder: 0,
      },
      {
        packSlug: 'pack-gravel-essential',
        icon: 'shield',
        label: 'Protection',
        value: 'ProTek 3 mm',
        sortOrder: 1,
      },
      {
        packSlug: 'pack-gravel-essential',
        icon: 'straighten',
        label: 'Dimension',
        value: '700x38c / 650b-42',
        sortOrder: 2,
      },

      {
        packSlug: 'pack-route-premium',
        icon: 'bolt',
        label: 'Résistance au roulement',
        value: 'Ultra-Low (2 sur 5)',
        sortOrder: 0,
      },
      {
        packSlug: 'pack-route-premium',
        icon: 'shield',
        label: 'Protection',
        value: 'ProTek+ 5 mm',
        sortOrder: 1,
      },
      {
        packSlug: 'pack-route-premium',
        icon: 'straighten',
        label: 'Dimension',
        value: '700x25c / 700x28c',
        sortOrder: 2,
      },

      {
        packSlug: 'pack-urbain-premium',
        icon: 'bolt',
        label: 'Résistance au roulement',
        value: 'Moyenne (3 sur 5)',
        sortOrder: 0,
      },
      {
        packSlug: 'pack-urbain-premium',
        icon: 'shield',
        label: 'Protection',
        value: 'AirStop 4 mm',
        sortOrder: 1,
      },
      {
        packSlug: 'pack-urbain-premium',
        icon: 'straighten',
        label: 'Dimension',
        value: '700x35c / 26x1.75',
        sortOrder: 2,
      },
    ]

    await PackTechnology.createMany(
      technologies.map(({ packSlug, ...tech }) => ({
        ...tech,
        packId: packBySlug[packSlug].id,
      }))
    )

    await Review.query().delete()

    const reviews = [
      {
        packSlug: 'pack-gravel-premium',
        author: 'Léa F.',
        initial: 'L',
        rating: 5,
        text: 'Adhérence sur gravier mouillé absolument remarquable. Ces pneus ont transformé mes sorties gravel.',
      },
      {
        packSlug: 'pack-gravel-premium',
        author: 'Marc D.',
        initial: 'M',
        rating: 5,
        text: "J'ai gagné 12 watts sur mon parcours habituel par rapport à mes anciens pneus. Bluffant.",
      },
      {
        packSlug: 'pack-gravel-premium',
        author: 'Sophie T.',
        initial: 'S',
        rating: 5,
        text: 'Montage facile, aucune crevaison en 3 mois de pratique intensive. Je recommande sans hésiter.',
      },
      {
        packSlug: 'pack-gravel-premium',
        author: 'Romain L.',
        initial: 'R',
        rating: 5,
        text: 'Rapport qualité-prix imbattable pour ce niveau de performance. Bravo Michelin !',
      },
      {
        packSlug: 'pack-gravel-premium',
        author: 'Elisa B.',
        initial: 'E',
        rating: 4,
        text: 'Excellents pneus, légèrement difficiles à monter sur des jantes étroites mais ça vaut le coup.',
      },

      {
        packSlug: 'pack-gravel-essential',
        author: 'Thomas B.',
        initial: 'T',
        rating: 5,
        text: 'Excellent rapport qualité-prix pour débuter le gravel. Solides et polyvalents.',
      },
      {
        packSlug: 'pack-gravel-essential',
        author: 'Camille R.',
        initial: 'C',
        rating: 4,
        text: 'Parfait pour les sorties mixtes chemin/bitume du quotidien.',
      },
      {
        packSlug: 'pack-gravel-essential',
        author: 'Antoine M.',
        initial: 'A',
        rating: 5,
        text: 'Ma première paire de pneus gravel et je suis conquis. Très bonne accroche sur tous les terrains.',
      },

      {
        packSlug: 'pack-route-premium',
        author: 'Pierre A.',
        initial: 'P',
        rating: 5,
        text: 'La référence sur route. Grip impeccable et durée de vie au rendez-vous après 5000 km.',
      },
      {
        packSlug: 'pack-route-premium',
        author: 'Julie M.',
        initial: 'J',
        rating: 5,
        text: "Pneus utilisés sur mon vélo de course. Je ne changerais pour rien d'autre.",
      },
      {
        packSlug: 'pack-route-premium',
        author: 'Nicolas V.',
        initial: 'N',
        rating: 5,
        text: 'Excellente tenue dans les virages mouillés, ce qui est rare à ce niveau de prix.',
      },
      {
        packSlug: 'pack-route-premium',
        author: 'Hélène C.',
        initial: 'H',
        rating: 4,
        text: 'Très bons pneus, je les recommande pour les cyclistes exigeants.',
      },

      {
        packSlug: 'pack-urbain-premium',
        author: 'Emilie S.',
        initial: 'E',
        rating: 5,
        text: 'Zéro crevaison depuis 6 mois de navettes quotidiennes. Confort au top sur les pavés parisiens.',
      },
      {
        packSlug: 'pack-urbain-premium',
        author: 'Yann K.',
        initial: 'Y',
        rating: 5,
        text: "Résistants, confortables et le design est sympa. Tout ce qu'on demande à un pneu urbain.",
      },
      {
        packSlug: 'pack-urbain-premium',
        author: 'Laura D.',
        initial: 'L',
        rating: 4,
        text: 'Parfaits pour la ville, je les recommande pour tous les cyclistes urbains.',
      },
    ]

    await Review.createMany(
      reviews.map(({ packSlug, ...review }) => ({
        ...review,
        packId: packBySlug[packSlug].id,
      }))
    )

    // Rendre les deux users éligibles aux drops gravel et route
    const users = await User.all()
    const eligibleDrops = [dropBySlug['drop-gravel-02'], dropBySlug['drop-route-01']]

    await DropEligibility.query().delete()

    for (const user of users) {
      for (const drop of eligibleDrops) {
        await DropEligibility.create({ dropId: drop.id, userId: user.id })
      }
    }
  }
}
