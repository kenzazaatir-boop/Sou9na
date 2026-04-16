import * as React from "react"
import { Search } from "lucide-react"
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
  const navigate = useNavigate()
  const { language, t } = useLanguage()
  const [productsData, setProductsData] = React.useState<Product[]>([])
  const [artisansData, setArtisansData] = React.useState<Artisan[]>([])

  React.useEffect(() => {
    getProducts().then(setProductsData)
    getArtisans().then(setArtisansData)
  }, [])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        className="w-9 h-9 p-0 xl:w-60 xl:h-10 xl:px-3 xl:py-2 xl:justify-start xl:gap-2 text-muted-foreground hover:text-foreground rounded-full xl:rounded-xl border border-transparent xl:border-border/50 bg-white/50 xl:bg-white/40 shadow-xs backdrop-blur-sm transition-all"
        onClick={() => setOpen(true)}
      >
        <Search className="w-4 h-4 xl:w-4 xl:h-4" />
        <span className="hidden xl:inline-flex flex-1 text-sm text-left">
          {t('nav.search') || "Rechercher..."}
        </span>
        <kbd className="hidden xl:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t('nav.search') || "Rechercher un produit ou un artisan..."} />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          
          <CommandGroup heading="Produits">
            {productsData.slice(0, 5).map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => runCommand(() => navigate(`/product/${product.id}`))}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={product.image} alt={product.name} className="w-8 h-8 rounded object-cover" />
                <div className="flex flex-col">
                    <span className="font-medium">{language === 'ar' && product.nameAr ? product.nameAr : product.name}</span>
                    <span className="text-xs text-muted-foreground">{product.artisan}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          
          <CommandSeparator />
          
          <CommandGroup heading="Artisans">
            {artisansData.slice(0, 3).map((artisan) => (
              <CommandItem
                key={artisan.id}
                onSelect={() => runCommand(() => navigate(`/artisan/${artisan.id}`))}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img src={artisan.image} alt={artisan.name} className="w-8 h-8 rounded-full object-cover" />
                <span>{language === 'ar' && artisan.nameAr ? artisan.nameAr : artisan.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
