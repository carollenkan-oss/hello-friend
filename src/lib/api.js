// Data-access layer.
// Today it reads the local data files. When we move to Supabase, replace the
// bodies of these functions with Supabase queries and keep the same signatures.
import uganda from '../data/packages/uganda.js'
import kenya from '../data/packages/kenya.js'
import tanzania from '../data/packages/tanzania.js'
import greatLakes from '../data/packages/great-lakes.js'
import ethiopia from '../data/packages/ethiopia.js'
import congoSudan from '../data/packages/congo-sudan.js'
import { countries, countryById } from '../data/countries.js'
import { paths } from '../data/paths.js'
import { peoples, peopleByName } from '../data/peoples.js'
import { sites } from '../data/sites.js'

export const packages = [...uganda, ...kenya, ...tanzania, ...greatLakes, ...ethiopia, ...congoSudan]
const bySlug = Object.fromEntries(packages.map((p) => [p.slug, p]))

export { countries, countryById, paths, peoples, sites }

export const pathById = Object.fromEntries(paths.map((p) => [p.id, p]))
export const getPackage = (slug) => bySlug[slug]
export const getPeople = (slug) => peoples.find((p) => p.slug === slug)
export const peopleRef = (name) => peopleByName[name]

export const packagesFor = ({ country, path, people, region, faith, length, offbeat } = {}) =>
  packages.filter((p) =>
    (!country || p.country === country) &&
    (!path || p.paths.includes(path)) &&
    (!people || p.peoples.includes(people)) &&
    (!region || p.region === region) &&
    (!faith || p.faiths.includes(faith)) &&
    (!offbeat || p.offbeat) &&
    (!length || (length === '1' ? p.days === 1 : length === '2-3' ? p.days >= 2 && p.days <= 3 : p.days >= 4)),
  )

export const packagesForPeople = (name) => packages.filter((p) => p.peoples.includes(name))
export const sitesFor = (country) => sites.filter((s) => s.country === country)

export const facetsFor = (list) => ({
  paths: paths.filter((pa) => list.some((p) => p.paths.includes(pa.id))),
  peoples: [...new Set(list.flatMap((p) => p.peoples))].sort(),
  regions: [...new Set(list.map((p) => p.region))].sort(),
  faiths: [...new Set(list.flatMap((p) => p.faiths))].sort(),
})
