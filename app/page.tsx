"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatView } from "@/components/views/chat-view"
import { ChannelsView } from "@/components/views/channels-view"
import { SessionsView } from "@/components/views/sessions-view"
import { NodesView } from "@/components/views/nodes-view"
import { CronView } from "@/components/views/cron-view"
import { SkillsView } from "@/components/views/skills-view"
import { LogsView } from "@/components/views/logs-view"
import { SettingsView } from "@/components/views/settings-view"

type View = "chat" | "channels" | "sessions" | "nodes" | "cron" | "skills" | "logs" | "settings"

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("chat")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected")

  const renderView = () => {
    switch (currentView) {
      case "chat":
        return <ChatView />
      case "channels":
        return <ChannelsView />
      case "sessions":
        return <SessionsView />
      case "nodes":
        return <NodesView />
      case "cron":
        return <CronView />
      case "skills":
        return <SkillsView />
      case "logs":
        return <LogsView />
      case "settings":
        return <SettingsView />
      default:
        return <ChatView />
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
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>
    </div>
  )
}
