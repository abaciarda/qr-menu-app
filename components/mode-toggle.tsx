"use client"

import * as React from "react"
import { Check, Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themes = {
  light: {
    label: "Açık",
    icon: Sun,
  },
  dark: {
    label: "Koyu",
    icon: Moon,
  },
  system: {
    label: "Sistem",
    icon: Monitor,
  },
} as const

export function ModeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const selectedTheme =
    mounted && (theme === "light" || theme === "dark" || theme === "system")
      ? theme
      : "system"

  const currentTheme = themes[selectedTheme]
  const Icon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="gap-2 px-3">
            <Icon className="size-4" />
            <span>{currentTheme.label}</span>
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="justify-between"
        >
          <span className="flex items-center gap-2">
            <Sun className="size-4" />
            Açık
          </span>

          {selectedTheme === "light" && <Check className="size-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="justify-between"
        >
          <span className="flex items-center gap-2">
            <Moon className="size-4" />
            Koyu
          </span>

          {selectedTheme === "dark" && <Check className="size-4" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="justify-between"
        >
          <span className="flex items-center gap-2">
            <Monitor className="size-4" />
            Sistem
          </span>

          {selectedTheme === "system" && <Check className="size-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}