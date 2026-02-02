"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DashboardView } from "@/components/views/dashboard-view"
import { ChatView } from "@/components/views/chat-view"
import { ChannelsView } from "@/components/views/channels-view"
import { SessionsView } from "@/components/views/sessions-view"
import { SettingsView } from "@/components/views/settings-view"

type View = "dashboard" | "chat" | "channels" | "sessions" | "settings"

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected")

  const handleNavigate = (view: string) => {
    setCurrentView(view as View)
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardView onNavigate={handleNavigate} />
      case "chat":
        return <ChatView />
      case "channels":
        return <ChannelsView />
      case "sessions":
        return <SessionsView />
      case "settings":
        return <SettingsView />
      default:
        return <DashboardView onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        connectionStatus={connectionStatus}
      />
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  )
}
