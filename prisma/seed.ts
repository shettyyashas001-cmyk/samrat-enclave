import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const properties = [
    { title: 'Samrat Golfshire', slug: 'samrat-golfshire', location: 'Nandi Hills', dimensions: '50x80, 100x100', priceStartingFrom: '5.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/001', description: 'Ultra-luxury golf villas overlooking Nandi Hills.', features: JSON.stringify(['18-hole Golf Course', 'Marriott Hotel', 'Luxury Clubhouse', 'Helipad']), brochureUrl: '/brochures/golfshire.pdf' },
    { title: 'Samrat Shantiniketan', slug: 'samrat-shantiniketan', location: 'Whitefield', dimensions: 'Apartments', priceStartingFrom: '1.2 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/002', description: 'Integrated township in the heart of Whitefield.', features: JSON.stringify(['Mall', 'Tech Park', 'Multiplex', 'Forum Mall']), brochureUrl: '/brochures/shantiniketan.pdf' },
    { title: 'Samrat Falcon City', slug: 'samrat-falcon-city', location: 'Kanakapura Road', dimensions: 'Apartments', priceStartingFrom: '1.8 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/003', description: 'High-rise luxury apartments with a massive retail mall.', features: JSON.stringify(['Forum Mall', 'Metro Connectivity', 'Clubhouse', 'Swimming Pool']), brochureUrl: '/brochures/falcon-city.pdf' },
    { title: 'Samrat Tech Enclave', slug: 'samrat-tech-enclave', location: 'Electronic City', dimensions: '30x50, 40x60', priceStartingFrom: '1.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/004', description: 'Strategic plots in the tech corridor.', features: JSON.stringify(['Tech-enabled living', 'Coworking space', 'Sports Arena', 'Rainwater Harvesting']), brochureUrl: '/brochures/tech-enclave.pdf' },
    { title: 'Samrat Royale', slug: 'samrat-royale', location: 'JP Nagar', dimensions: '40x60, 50x80', priceStartingFrom: '3.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/005', description: 'Classic charm meets modern amenities.', features: JSON.stringify(['Prime Location', 'Exclusive Neighborhood', 'Landscaped Parks', 'Concierge Service']), brochureUrl: '/brochures/royale.pdf' },
    { title: 'Samrat Greenways', slug: 'samrat-greenways', location: 'Bilishivale', dimensions: '30x40, 30x50', priceStartingFrom: '1.2 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/006', description: 'Premium villa plots nestled in lush green corridors.', features: JSON.stringify(['Gated Community', 'Clubhouse', '24/7 Security']), brochureUrl: '/brochures/greenways.pdf' },
    { title: 'Samrat Lakeside', slug: 'samrat-lakeside', location: 'Yelahanka', dimensions: 'Villas', priceStartingFrom: '4.2 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/007', description: 'Lake-facing bespoke villas.', features: JSON.stringify(['Lake View', 'Private Garden', 'Smart Home']), brochureUrl: '/brochures/lakeside.pdf' },
    { title: 'Samrat Highline', slug: 'samrat-highline', location: 'Indiranagar', dimensions: 'Penthouses', priceStartingFrom: '6.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/008', description: 'Exclusive penthouses in the city center.', features: JSON.stringify(['Private Pool', 'City View', 'Valet Parking']), brochureUrl: '/brochures/highline.pdf' },
    { title: 'Samrat Botanica', slug: 'samrat-botanica', location: 'Sarjapur Road', dimensions: 'Apartments', priceStartingFrom: '95 L', reraNumber: 'PRM/KA/RERA/1251/446/PR/009', description: 'Nature-themed apartment complex.', features: JSON.stringify(['Botanical Gardens', 'Organic Farm', 'Yoga Pavilion']), brochureUrl: '/brochures/botanica.pdf' },
    { title: 'Samrat Oasis', slug: 'samrat-oasis', location: 'Devanahalli', dimensions: '30x40, 40x50', priceStartingFrom: '60 L', reraNumber: 'PRM/KA/RERA/1251/446/PR/010', description: 'Affordable luxury plots near the airport.', features: JSON.stringify(['Airport Proximity', 'Clubhouse', 'Kids Play Area']), brochureUrl: '/brochures/oasis.pdf' },
    { title: 'Samrat Crest', slug: 'samrat-crest', location: 'Hebbal', dimensions: 'Apartments', priceStartingFrom: '2.5 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/011', description: 'Sky-high luxury living overlooking Hebbal lake.', features: JSON.stringify(['Infinity Pool', 'Sky Lounge', 'Gymnasium']), brochureUrl: '/brochures/crest.pdf' },
    { title: 'Samrat Woods', slug: 'samrat-woods', location: 'Bannerghatta Road', dimensions: 'Villas', priceStartingFrom: '3.1 Cr', reraNumber: 'PRM/KA/RERA/1251/446/PR/012', description: 'Forest-themed villa community.', features: JSON.stringify(['Forest Trail', 'Amphitheatre', 'Pet Park']), brochureUrl: '/brochures/woods.pdf' },
  ]

  for (const p of properties) {
    await prisma.property.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    })
  }
  console.log('Database seeded with 12 prestige-style projects!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
