"use client"

import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Radio,
  Users,
  Settings,
  Activity,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type View = "dashboard" | "chat" | "channels" | "sessions" | "settings"

interface SidebarProps {
  currentView: View
  onViewChange: (view: View) => void
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  connectionStatus: "connected" | "connecting" | "disconnected"
}

const navItems: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "channels", label: "Channels", icon: Radio },
  { id: "sessions", label: "Sessions", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({
  currentView,
  onViewChange,
  collapsed,
  onCollapsedChange,
  connectionStatus,
}: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-full flex-col border-r border-border bg-card transition-all duration-200",
          collapsed ? "w-16" : "w-56"
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center border-b border-border px-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 3c-1.5 0-2.8.5-3.9 1.3L5.5 6.8C4.5 8 4 9.5 4 11c0 2.5 1.4 4.6 3.5 5.6L6 21h4l1-3h2l1 3h4l-1.5-4.4c2.1-1 3.5-3.1 3.5-5.6 0-1.5-.5-3-1.5-4.2l-2.6-2.5C15.8 3.5 14 3 12 3zm-3 8c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm6 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
              </svg>
            </div>
            {!collapsed && (
              <span className="font-semibold text-foreground">OpenClaw</span>
            )}
          </div>
        </div>

        {/* Connection Status */}
        <div className={cn("border-b border-border px-3 py-2", collapsed && "px-2")}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5",
                  collapsed && "justify-center px-0"
                )}
              >
                <div className="relative">
                  <Activity
                    className={cn(
                      "h-4 w-4",
                      connectionStatus === "connected" && "text-green-500",
                      connectionStatus === "connecting" && "text-amber-500",
                      connectionStatus === "disconnected" && "text-red-500"
                    )}
                  />
                  {connectionStatus === "connected" && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-green-500" />
                  )}
                </div>
                {!collapsed && (
                  <span className="text-xs text-muted-foreground capitalize">
                    Gateway {connectionStatus}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <span className="capitalize">Gateway {connectionStatus}</span>
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onViewChange(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      collapsed && "justify-center px-2",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </nav>

        {/* Version & Collapse */}
        <div className="border-t border-border p-2 space-y-2">
          {!collapsed && (
            <div className="px-3 py-1">
              <span className="text-xs text-muted-foreground">v2026.1.30</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapsedChange(!collapsed)}
            className={cn("w-full", collapsed && "px-2")}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span>Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
