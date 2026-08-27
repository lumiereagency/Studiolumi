"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_LUMI = [0.16, 1, 0.3, 1] as const;

type Side = "top" | "right" | "bottom" | "left";

const SLIDE_OFFSET: Record<Side, { x?: number; y?: number }> = {
  right: { x: 32 },
  left: { x: -32 },
  top: { y: -32 },
  bottom: { y: 32 },
};

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const reduceMotion = useReducedMotion();
  return (
    <SheetPrimitive.Overlay asChild forceMount>
      <motion.div
        data-slot="sheet-overlay"
        className={cn("fixed inset-0 z-40 bg-ink/60", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: EASE_LUMI }}
        {...props}
      />
    </SheetPrimitive.Overlay>
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  open,
  showOverlay = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: Side;
  open: boolean;
  showOverlay?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const offset = SLIDE_OFFSET[side];

  return (
    <AnimatePresence>
      {open && (
        <SheetPrimitive.Portal forceMount>
          {showOverlay && <SheetOverlay />}
          <SheetPrimitive.Content asChild forceMount {...props}>
            <motion.div
              data-slot="sheet-content"
              className={cn("fixed z-40 bg-ink outline-none", className)}
              initial={{ opacity: 0, ...offset }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, ...offset }}
              transition={{ duration: reduceMotion ? 0.01 : 0.35, ease: EASE_LUMI }}
            >
              {children}
            </motion.div>
          </SheetPrimitive.Content>
        </SheetPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={className} {...props} />;
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description data-slot="sheet-description" className={className} {...props} />
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription };
