"use client"

import { useTheme } from "next-themes"
import { CSSProperties } from "react"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

const errorCss : CSSProperties = {
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "0.5rem",
}

const successCss : CSSProperties = {
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "0.5rem",
}

export { Toaster , errorCss, successCss}
