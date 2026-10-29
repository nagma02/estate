import { useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRightIcon, SearchIcon } from './Icons'
import { searchProperties } from './propertySearch'

// Live property search: filters by project name, location or developer as the user types.
export default function HeaderSearch({ query, setQuery, onNavigate, inputRef, categoryFilter = '', large = false }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const boxRef = useRef(null)
  const fallbackRef = useRef(null)
  const fieldRef = inputRef || fallbackRef
  const listId = useId()
  const results = searchProperties(query, categoryFilter).slice(0, 6)
  const showList = open && query.trim().length > 0

  useEffect(() => {
    if (!open) return undefined
    const close = event => { if (!boxRef.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  const choose = item => {
    setOpen(false)
    setQuery('')
    fieldRef.current?.blur()
    onNavigate(item.path)
  }
  const onKeyDown = event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActive(i => Math.min(i + 1, results.length - 1)) }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setActive(i => Math.max(i - 1, 0)) }
    else if (event.key === 'Escape') setOpen(false)
  }
  const submit = event => {
    event.preventDefault()
    if (results.length) choose(results[Math.min(active, results.length - 1)])
    else { setOpen(true); fieldRef.current?.focus() }
  }

  return <form className={`ar-search${large ? ' ar-search-lg' : ''}`} role="search" onSubmit={submit} ref={boxRef}>
    <SearchIcon className="ar-search-glyph" width={large ? 20 : 17} height={large ? 20 : 17}/>
    <input ref={fieldRef} type="search" value={query} placeholder="Search by City, Location, Project, Developer" aria-label="Search properties" role="combobox" aria-expanded={showList} aria-controls={listId} aria-autocomplete="list" aria-activedescendant={showList && results.length ? `${listId}-${active}` : undefined}
      onChange={event => { setQuery(event.target.value); setActive(0); setOpen(true) }} onFocus={() => setOpen(true)} onKeyDown={onKeyDown}/>
    <button type="submit" className="ar-search-submit" aria-label="Search">{large ? <>Search <ArrowUpRightIcon width="16" height="16"/></> : <SearchIcon width="16" height="16"/>}</button>
    {showList && <div className="ar-search-results" id={listId} role="listbox" aria-label="Matching properties">
      {results.length ? results.map((item, index) => <button type="button" role="option" id={`${listId}-${index}`} aria-selected={index === active} className={index === active ? 'active' : ''} key={item.path} onMouseEnter={() => setActive(index)} onClick={() => choose(item)}>
        <img src={item.image} alt=""/>
        <span><b>{item.name}</b><small>{item.place}</small>{item.developer && <small className="ar-search-dev">By {item.developer}</small>}</span>
        <em>{item.category}</em>
      </button>) : <p className="ar-search-empty">No properties match “{query.trim()}”.</p>}
    </div>}
  </form>
}
