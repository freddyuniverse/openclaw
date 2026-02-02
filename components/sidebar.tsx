"use client"

import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Radio,
  Users,
  Settings,
  Activity,
  Clock,
  Zap,
  MonitorSmartphone,
  ScrollText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type View = "chat" | "channels" | "sessions" | "nodes" | "cron" | "skills" | "logs" | "settings"

interface SidebarProps {
  currentView: View
  onViewChange: (view: View) => void
  collapsed: boolean
  onCollapsedChange: (collapsed: boolean) => void
  connectionStatus: "connected" | "connecting" | "disconnected"
}

const navItems: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "channels", label: "Channels", icon: Radio },
  { id: "sessions", label: "Sessions", icon: Users },
  { id: "nodes", label: "Nodes", icon: MonitorSmartphone },
  { id: "cron", label: "Cron Jobs", icon: Clock },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "logs", label: "Logs", icon: ScrollText },
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
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
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
                      connectionStatus === "connecting" && "text-yellow-500",
                      connectionStatus === "disconnected" && "text-red-500"
                    )}
                  />
                  {connectionStatus === "connected" && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-green-500" />
                  )}
                </div>
                {!collapsed && (
                  <span className="text-xs text-muted-foreground capitalize">
                    {connectionStatus}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <span className="capitalize">{connectionStatus}</span>
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
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
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

        {/* Collapse Toggle */}
        <div className="border-t border-border p-2">
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
