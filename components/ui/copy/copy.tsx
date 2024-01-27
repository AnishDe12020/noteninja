"use client"

import React, { useState } from "react"
import { clx } from "@/utils/clx"
import { CheckCircleSolid, SquareTwoStack } from "@medusajs/icons"
import { Slot } from "@radix-ui/react-slot"
import copy from "copy-to-clipboard"

import { Tooltip } from "@/components/ui/tooltip"

type CopyProps = {
  content: string
  asChild?: boolean
}

const Copy = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement> & CopyProps
>(({ children, className, content, asChild = false, ...props }, ref) => {
  const [done, setDone] = useState(false)
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("Copy")

  const copyToClipboard = () => {
    setDone(true)
    copy(content)

    setTimeout(() => {
      setDone(false)
    }, 2000)
  }

  React.useEffect(() => {
    if (done) {
      setText("Copied")
      return
    }

    setTimeout(() => {
      setText("Copy")
    }, 500)
  }, [done])

  const Component = asChild ? Slot : "button"

  return (
    <Component
      ref={ref}
      aria-label="Copy code snippet"
      type="button"
      className={clx("text-ui-code-icon h-fit w-fit", className)}
      onClick={copyToClipboard}
      {...props}
    >
      {children ? children : done ? <CheckCircleSolid /> : <SquareTwoStack />}
    </Component>
  )
})
Copy.displayName = "Copy"

export { Copy }
