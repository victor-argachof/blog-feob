"use client"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

const ThemedImage = ({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  className,
}: {
  lightSrc: string
  darkSrc: string
  alt: string
  width: number
  height: number
  className?: string
}) => {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Se o tema estiver definido como "system", use resolvedTheme
  const currentTheme = theme === "system" ? resolvedTheme : theme

  const src = currentTheme === "dark" ? darkSrc : lightSrc

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}

export default ThemedImage
