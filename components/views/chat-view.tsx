"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Mic,
  MicOff,
  Paperclip,
  MoreHorizontal,
  Copy,
  RefreshCw,
  Wrench,
  Bot,
  User,
  Sparkles,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  toolCalls?: { name: string; status: "running" | "completed" | "failed" }[]
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm OpenClaw, your personal AI assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 60000 * 5),
  },
]

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSimulatedResponse(input),
        timestamp: new Date(),
        toolCalls: input.toLowerCase().includes("weather") || input.toLowerCase().includes("search")
          ? [{ name: "web_search", status: "completed" }]
          : undefined,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getSimulatedResponse = (query: string): string => {
    const lower = query.toLowerCase()
    if (lower.includes("weather")) {
      return "I checked the weather for you. It's currently 72°F (22°C) with partly cloudy skies. The forecast shows a high of 78°F and a low of 65°F today."
    }
    if (lower.includes("hello") || lower.includes("hi")) {
      return "Hello! Great to hear from you. What would you like to accomplish today?"
    }
    if (lower.includes("help")) {
      return "I can help you with many things:\n\n- **Chat** across WhatsApp, Telegram, Discord, and more\n- **Search** the web for information\n- **Manage** your calendar and reminders\n- **Control** smart home devices\n- **Execute** custom skills and automations\n\nWhat would you like to try?"
    }
    return "I understand. Let me help you with that. Is there anything specific you'd like me to do or any additional details you can provide?"
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">OpenClaw Assistant</h1>
            <p className="text-xs text-muted-foreground">Always ready to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            GPT-4o
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <RefreshCw className="mr-2 h-4 w-4" />
                New conversation
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                Export chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-fade-in",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback
                  className={cn(
                    message.role === "assistant"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {message.role === "assistant" ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "flex max-w-[80%] flex-col gap-2",
                  message.role === "user" && "items-end"
                )}
              >
                {message.toolCalls && message.toolCalls.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {message.toolCalls.map((tool, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="gap-1 text-xs"
                      >
                        <Wrench className="h-3 w-3" />
                        {tool.name}
                      </Badge>
                    ))}
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 text-sm",
                    message.role === "assistant"
                      ? "bg-card border border-border text-card-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1 rounded-2xl border border-border bg-card px-4 py-3">
                <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
                <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
                <span className="typing-dot h-2 w-2 rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 shrink-0",
                isListening && "text-primary"
              )}
              onClick={() => setIsListening(!isListening)}
            >
              {isListening ? (
                <Mic className="h-4 w-4" />
              ) : (
                <MicOff className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            OpenClaw can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  )
}
