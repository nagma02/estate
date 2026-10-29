import { projectCatalog } from '../../pages/RoutePages/listingsData'

const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// Only builders that are named in the project names or site copy.
const developers = [['rishita', 'Rishita Developers'], ['eldeco', 'Eldeco'], ['omaxe', 'Omaxe']]
const developerOf = name => developers.find(([key]) => name.toLowerCase().startsWith(key))?.[1] || ''

// One entry per project page; the first catalog entry wins, matching the router's lookup.
export const searchableProperties = projectCatalog.reduce((list, item) => {
  const path = `/property/${slug(item.name)}`
  if (!list.some(entry => entry.path === path)) list.push({ ...item, path, developer: developerOf(item.name) })
  return list
}, [])

export const searchLocalities = ['Gomti Nagar Extension', 'Sushant Golf City', 'Sultanpur Road', 'Bijnor Road', 'Vrindavan Yojna', 'Golf City, Bagiamau']

export function searchProperties(query, categoryFilter = '') {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return searchableProperties.filter(item => {
    if (categoryFilter === 'COMMERCIAL' && item.category !== 'COMMERCIAL') return false
    if (categoryFilter === 'RESIDENTIAL' && item.category === 'COMMERCIAL') return false
    const haystack = `${item.name} ${item.place} ${item.developer} ${item.category}`.toLowerCase()
    return terms.every(term => haystack.includes(term))
  })
}
