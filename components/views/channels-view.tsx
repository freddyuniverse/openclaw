"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MessageCircle,
  Send,
  Hash,
  Mail,
  Phone,
  Globe,
  Plus,
  Settings,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react"

interface Channel {
  id: string
  name: string
  type: "whatsapp" | "telegram" | "discord" | "slack" | "email" | "sms" | "web"
  status: "connected" | "disconnected" | "pending"
  enabled: boolean
  lastActivity?: string
  messageCount?: number
}

const channelIcons: Record<Channel["type"], React.ElementType> = {
  whatsapp: MessageCircle,
  telegram: Send,
  discord: Hash,
  slack: Hash,
  email: Mail,
  sms: Phone,
  web: Globe,
}

const channelColors: Record<Channel["type"], string> = {
  whatsapp: "bg-green-500/10 text-green-500",
  telegram: "bg-blue-500/10 text-blue-500",
  discord: "bg-indigo-500/10 text-indigo-500",
  slack: "bg-purple-500/10 text-purple-500",
  email: "bg-orange-500/10 text-orange-500",
  sms: "bg-cyan-500/10 text-cyan-500",
  web: "bg-primary/10 text-primary",
}

const initialChannels: Channel[] = [
  {
    id: "1",
    name: "WhatsApp Personal",
    type: "whatsapp",
    status: "connected",
    enabled: true,
    lastActivity: "2 minutes ago",
    messageCount: 1247,
  },
  {
    id: "2",
    name: "Telegram Bot",
    type: "telegram",
    status: "connected",
    enabled: true,
    lastActivity: "15 minutes ago",
    messageCount: 892,
  },
  {
    id: "3",
    name: "Discord Server",
    type: "discord",
    status: "disconnected",
    enabled: false,
    messageCount: 0,
  },
  {
    id: "4",
    name: "Slack Workspace",
    type: "slack",
    status: "pending",
    enabled: true,
    messageCount: 156,
  },
  {
    id: "5",
    name: "Email Integration",
    type: "email",
    status: "connected",
    enabled: true,
    lastActivity: "1 hour ago",
    messageCount: 423,
  },
]

export function ChannelsView() {
  const [channels, setChannels] = useState<Channel[]>(initialChannels)
  const [isAddingChannel, setIsAddingChannel] = useState(false)

  const toggleChannel = (id: string) => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === id ? { ...ch, enabled: !ch.enabled } : ch
      )
    )
  }

  const getStatusIcon = (status: Channel["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "disconnected":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />
    }
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 items-center justify-between border-b border-border px-6">
        <div>
          <h1 className="text-lg font-semibold">Channels</h1>
          <p className="text-xs text-muted-foreground">
            Manage your connected messaging platforms
          </p>
        </div>
        <Dialog open={isAddingChannel} onOpenChange={setIsAddingChannel}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Channel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Channel</DialogTitle>
              <DialogDescription>
                Connect a new messaging platform to OpenClaw
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-4">
              {Object.entries(channelIcons).map(([type, Icon]) => (
                <button
                  key={type}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted",
                    channelColors[type as Channel["type"]]
                  )}
                  onClick={() => setIsAddingChannel(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium capitalize text-foreground">
                    {type}
                  </span>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channelIcons[channel.type]
            return (
              <Card key={channel.id} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        channelColors[channel.type]
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <Switch
                      checked={channel.enabled}
                      onCheckedChange={() => toggleChannel(channel.id)}
                    />
                  </div>
                  <CardTitle className="mt-3 text-base">{channel.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {getStatusIcon(channel.status)}
                    <span className="capitalize">{channel.status}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Messages</span>
                    <span className="font-medium">
                      {channel.messageCount?.toLocaleString() || 0}
                    </span>
                  </div>
                  {channel.lastActivity && (
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last active</span>
                      <span className="text-muted-foreground">
                        {channel.lastActivity}
                      </span>
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Settings className="h-3 w-3" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
