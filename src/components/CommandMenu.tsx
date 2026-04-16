import * as React from "react"
import { Search, Package, User, ArrowRight, Tag, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useLanguage } from "@/store/LanguageContext"
import { getArtisans, getProducts } from "@/lib/data"
import type { Artisan, Product } from "@/types"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const [productsData, setProductsData] = React.useState<Product[]>([])
  const [artisansData, setArtisansData] = React.useState<Artisan[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  // Load all data once on mount
  React.useEffect(() => {
    Promise.all([getProducts(), getArtisans()]).then(([products, artisans]) => {
      setProductsData(products)
      setArtisansData(artisans)
      setIsLoading(false)
    })
  }, [])

  // Keyboard shortcut ⌘K / Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    setQuery("")
    command()
  }, [])

  // Client-side keyword filter — searched across name, artisan, category, location, description
  const filteredProducts = React.useMemo(() => {
    if (!query.trim()) return productsData.slice(0, 6) // show 6 "featured" when empty
    const q = query.toLowerCase().trim()
    return productsData.filter((p) => {
      const haystack = [
        p.name,
        p.nameAr ?? "",
        p.artisan,
        p.category,
        p.location,
        p.description ?? "",
        p.descriptionAr ?? "",
        String(p.price),
      ].join(" ").toLowerCase()
      return haystack.includes(q)
    })
  }, [query, productsData])

  const filteredArtisans = React.useMemo(() => {
    if (!query.trim()) return artisansData.slice(0, 3)
    const q = query.toLowerCase().trim()
    return artisansData.filter((a) => {
      const haystack = [
        a.name,
        a.nameAr ?? "",
        a.specialty,
        a.specialtyAr ?? "",
        a.location,
        a.bio ?? "",
      ].join(" ").toLowerCase()
      return haystack.includes(q)
    })
  }, [query, artisansData])

  const hasResults = filteredProducts.length > 0 || filteredArtisans.length > 0

  return (
    <>
      <Button
        variant="ghost"
        className="w-9 h-9 p-0 xl:w-64 xl:h-10 xl:px-3 xl:py-2 xl:justify-start xl:gap-2 text-muted-foreground hover:text-foreground rounded-full xl:rounded-xl border border-transparent xl:border-border/50 bg-white/50 xl:bg-white/40 shadow-xs backdrop-blur-sm transition-all"
        onClick={() => setOpen(true)}
        aria-label="Ouvrir la recherche"
      >
        <Search className="w-4 h-4 shrink-0" />
        <span className="hidden xl:inline-flex flex-1 text-sm text-left">
          {t('nav.search') || "Rechercher..."}
        </span>
        <kbd className="hidden xl:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQuery("") }}>
        <CommandInput
          placeholder={language === 'ar' ? "ابحث عن منتج، صنف، حرفي..." : "Produit, catégorie, artisan, région..."}
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[480px]">
          {/* Loading state */}
          {isLoading && (
            <div className="py-8 text-center text-sm text-muted-foreground animate-pulse">
              Chargement du catalogue...
            </div>
          )}

          {/* No results */}
          {!isLoading && !hasResults && (
            <CommandEmpty className="py-8">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Search className="w-8 h-8 opacity-30" />
                <p className="font-medium">Aucun résultat pour « {query} »</p>
                <p className="text-xs">Essayez un nom de produit, une catégorie ou une région</p>
              </div>
            </CommandEmpty>
          )}

          {/* Products */}
          {!isLoading && filteredProducts.length > 0 && (
            <CommandGroup
              heading={
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <Package className="w-3 h-3" />
                  Produits {query && `(${filteredProducts.length} résultat${filteredProducts.length > 1 ? 's' : ''})`}
                </span>
              }
            >
              {filteredProducts.map((product) => {
                const name = language === 'ar' && product.nameAr ? product.nameAr : product.name
                return (
                  <CommandItem
                    key={product.id}
                    value={`${product.name} ${product.nameAr ?? ''} ${product.artisan} ${product.category} ${product.location} ${product.description ?? ''}`}
                    onSelect={() => runCommand(() => navigate(`/product/${product.id}`))}
                    className="flex items-center gap-3 cursor-pointer py-2.5 aria-selected:bg-terracotta/5"
                  >
                    <img
                      src={product.image}
                      alt={name}
                      loading="lazy"
                      className="w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-100"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-semibold text-sm truncate">{name}</span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />{product.artisan}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />{product.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{product.location}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-terracotta shrink-0">{product.price} TND</span>
                  </CommandItem>
                )
              })}

              {/* "See all results" link when searching */}
              {query && filteredProducts.length > 0 && (
                <CommandItem
                  onSelect={() => runCommand(() => navigate(`/catalog?q=${encodeURIComponent(query)}`))}
                  className="flex items-center justify-center gap-2 text-sm font-bold text-terracotta cursor-pointer py-2 mt-1 border-t border-dashed"
                >
                  Voir tous les résultats dans le catalogue
                  <ArrowRight className="w-4 h-4" />
                </CommandItem>
              )}
            </CommandGroup>
          )}

          {filteredArtisans.length > 0 && filteredProducts.length > 0 && (
            <CommandSeparator />
          )}

          {/* Artisans */}
          {!isLoading && filteredArtisans.length > 0 && (
            <CommandGroup
              heading={
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <User className="w-3 h-3" />
                  Artisans {query && `(${filteredArtisans.length})`}
                </span>
              }
            >
              {filteredArtisans.map((artisan) => {
                const name = language === 'ar' && artisan.nameAr ? artisan.nameAr : artisan.name
                return (
                  <CommandItem
                    key={artisan.id}
                    value={`${artisan.name} ${artisan.nameAr ?? ''} ${artisan.specialty} ${artisan.location} ${artisan.bio ?? ''}`}
                    onSelect={() => runCommand(() => navigate(`/artisan/${artisan.id}`))}
                    className="flex items-center gap-3 cursor-pointer py-2.5 aria-selected:bg-terracotta/5"
                  >
                    <img
                      src={artisan.image}
                      alt={name}
                      loading="lazy"
                      className="w-10 h-10 rounded-full object-cover shrink-0 border-2 border-terracotta/20"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm">{name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {artisan.location} · {artisan.specialty}
                      </span>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
