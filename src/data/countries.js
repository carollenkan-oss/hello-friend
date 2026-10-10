// Mirrors a future Supabase table: countries
export const countries = [
  {
    id: 'uganda',
    name: 'Uganda',
    tone: '#7a3b1d',
    headline: 'Kingdoms, sources and sixty-five peoples.',
    intro:
      'Our home. The source of the Nile, the royal tombs of Buganda, kingdoms that still crown their kings, and more than sixty recognised communities, from the Baganda around Kampala to the Ik on the Morungole ridge. Uganda holds more living tradition per mile than almost anywhere on earth, and many of its most remarkable places are barely known even to Ugandans.',
    regions: ['Central', 'Eastern', 'Northern', 'Karamoja', 'West Nile', 'Western'],
  },
  {
    id: 'kenya',
    name: 'Kenya',
    tone: '#8a5a12',
    headline: 'Coral towns, sacred forests and the Rift.',
    intro:
      "From the Swahili lanes of Lamu to the kaya forests of the Mijikenda, from Kirinyaga, sacred mountain of the Kikuyu, to the red roads where Kalenjin champions train, Kenya is many worlds at once. Its peoples carry their cultures proudly into one of Africa's most creative capitals.",
    regions: ['Coast', 'Nairobi', 'Central', 'Western', 'Rift Valley', 'North'],
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    tone: '#1f5b5b',
    headline: 'Spice islands and the cradle of humankind.',
    intro:
      "Zanzibar's Stone Town, the sultans' ruins of Kilwa, the caravan town of Bagamoyo, the fossil beds of Olduvai and painted rocks still honoured by their communities. Tanzania is home to well over a hundred peoples, from the Chagga on Kilimanjaro to the Sukuma dancers of Lake Victoria.",
    regions: ['Zanzibar', 'Coast', 'North', 'Central', 'Lake Zone'],
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    tone: '#3d5a1e',
    headline: 'Royal hills, memory and renewal.',
    intro:
      'A land of a thousand hills where the royal court once sat at Nyanza, where inyambo cattle are still sung to, and where a nation has rebuilt itself after the genocide against the Tutsi. Rwandans share one language and culture, and we present it as they do.',
    regions: ['Kigali', 'Southern', 'Eastern', 'Western'],
  },
  {
    id: 'burundi',
    name: 'Burundi',
    tone: '#6b2a2a',
    headline: 'Where the drums were sacred.',
    intro:
      'In Burundi the royal drum was a symbol of the king, and its ritual dance is recognised by UNESCO. Gitega, the old royal capital, the beaches of Lake Tanganyika and the southernmost source of the Nile make it one of the region\'s most rewarding and least visited countries.',
    regions: ['Gitega', 'Bujumbura', 'South'],
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    tone: '#5a2d5f',
    headline: 'Churches of rock, cities of saints.',
    intro:
      'Ethiopia embraced Christianity in the 4th century and kept its own script, calendar and music. Its rock-hewn churches, castles, island monasteries and the walled Muslim city of Harar sit alongside the Oromo Gadaa system, the coffee ceremony and over eighty peoples.',
    regions: ['Addis Ababa', 'North', 'East', 'Central'],
    note: 'Parts of northern Ethiopia, including the Amhara region, have seen insecurity. We run northern packages only when official advice and local partners confirm it is safe.',
  },
  {
    id: 'dr-congo',
    name: 'DR Congo',
    tone: '#7a1f3d',
    headline: 'Rumba, style and holy hills.',
    intro:
      "Kinshasa gave the continent rumba, now recognised by UNESCO, and the sapeurs turned elegance into an art. In the hills of Kongo Central lies Nkamba, holy city of the Kimbanguist Church. DR Congo is home to more than two hundred peoples and some of Africa's most admired art.",
    regions: ['Kinshasa', 'Kongo Central'],
    note: 'DR Congo packages run with security-cleared local partners, in small groups, when official travel advice allows.',
  },
  {
    id: 'south-sudan',
    name: 'South Sudan',
    tone: '#7a5a1d',
    headline: 'Cattle camps on the White Nile.',
    intro:
      "The world's youngest nation, home to the Dinka, Nuer, Mundari, Azande, Shilluk and many more. Along the White Nile, cattle camps glow at dawn with dung-fire smoke, and cattle are wealth, poetry and identity.",
    regions: ['Juba', 'Central Equatoria'],
    note: 'South Sudan packages run with security-cleared local partners, in small groups of 2 to 8, when official travel advice allows.',
  },
]

export const countryById = Object.fromEntries(countries.map((c) => [c.id, c]))
