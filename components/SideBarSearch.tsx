'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

export function SideBarSearch() {
  const pathname = usePathname()
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()
  const params = useSearchParams()
  console.log(params)

  const handleSearch = (searchTerm: string) => {
    console.log('handleSearch', searchTerm)
    const params = new URLSearchParams(searchTerm)
    if (searchTerm) {
      params.set('keyword', searchTerm)
    }
    else {
      params.delete('keyword')
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }
  return (
    <>
      <div className="search" role="search">
        <label className="offscreen" htmlFor="sidebar-search-input">
          Search for a note by title
        </label>
        <input
          id="sidebar-search-input"
          type="text"
          placeholder="Search"
          onChange={e => handleSearch(e.target.value)}
        />
      </div>
    </>
  )
}
