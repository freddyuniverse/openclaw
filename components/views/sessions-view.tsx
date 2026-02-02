"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Clock,
  MessageSquare,
  MoreVertical,
  Archive,
  Trash2,
  Star,
  StarOff,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Session {
  id: string
  title: string
  preview: string
  channel: string
  channelColor: string
  timestamp: Date
  messageCount: number
  starred: boolean
}

const initialSessions: Session[] = [
  {
    id: "1",
    title: "Project Planning Discussion",
    preview: "Let me help you break down the project into manageable tasks...",
    channel: "WhatsApp",
    channelColor: "bg-green-500",
    timestamp: new Date(Date.now() - 60000 * 30),
    messageCount: 24,
    starred: true,
  },
  {
    id: "2",
    title: "Weather & Travel Planning",
    preview: "The weather in Barcelona looks great for your trip next week...",
    channel: "Telegram",
    channelColor: "bg-blue-500",
    timestamp: new Date(Date.now() - 60000 * 120),
    messageCount: 12,
    starred: false,
  },
  {
    id: "3",
    title: "Code Review Assistance",
    preview: "I've analyzed the pull request and found a few potential issues...",
    channel: "Discord",
    channelColor: "bg-indigo-500",
    timestamp: new Date(Date.now() - 60000 * 240),
    messageCount: 45,
    starred: true,
  },
  {
    id: "4",
    title: "Meeting Notes Summary",
    preview: "Here's a summary of the key points from today's standup...",
    channel: "Slack",
    channelColor: "bg-purple-500",
    timestamp: new Date(Date.now() - 60000 * 480),
    messageCount: 8,
    starred: false,
  },
  {
    id: "5",
    title: "Recipe Suggestions",
    preview: "Based on your preferences, here are some dinner ideas...",
    channel: "Web",
    channelColor: "bg-primary",
    timestamp: new Date(Date.now() - 60000 * 1440),
    messageCount: 15,
    starred: false,
  },
]

export function SessionsView() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions)
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "starred">("all")

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.preview.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || (filter === "starred" && session.starred)
    return matchesSearch && matchesFilter
  })

  const toggleStar = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, starred: !s.starred } : s))
    )
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex h-14 items-center justify-between border-b border-border px-6">
        <div>
          <h1 className="text-lg font-semibold">Sessions</h1>
          <p className="text-xs text-muted-foreground">
            View and manage conversation history
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "starred" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter("starred")}
            className="gap-1"
          >
            <Star className="h-3 w-3" />
            Starred
          </Button>
        </div>
      </header>

      <div className="border-b border-border px-6 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className={cn("text-white", session.channelColor)}>
                  {session.channel.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium truncate">{session.title}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleStar(session.id)
                      }}
                    >
                      {session.starred ? (
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ) : (
                        <StarOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground truncate">
                  {session.preview}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {session.channel}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {session.messageCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(session.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
