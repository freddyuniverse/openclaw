"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MessageSquare, 
  Zap, 
  Clock, 
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Activity,
  Bot,
  Users,
  Globe
} from "lucide-react"

interface DashboardViewProps {
  onNavigate: (view: string) => void
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const stats = [
    { label: "Messages Today", value: "1,247", change: "+12%", icon: MessageSquare },
    { label: "Active Sessions", value: "8", change: "+2", icon: Users },
    { label: "Connected Channels", value: "5", change: "0", icon: Globe },
    { label: "Avg Response Time", value: "1.2s", change: "-0.3s", icon: Clock },
  ]

  const channels = [
    { name: "WhatsApp", status: "connected", messages: 523 },
    { name: "Telegram", status: "connected", messages: 312 },
    { name: "Discord", status: "connected", messages: 189 },
    { name: "Slack", status: "disconnected", messages: 0 },
    { name: "Matrix", status: "connected", messages: 223 },
  ]

  const recentActivity = [
    { type: "message", channel: "WhatsApp", content: "Responded to John about meeting schedule", time: "2m ago" },
    { type: "tool", channel: "Telegram", content: "Executed web_search for market research", time: "5m ago" },
    { type: "message", channel: "Discord", content: "Answered question about project status", time: "8m ago" },
    { type: "session", channel: "System", content: "New session started from Matrix", time: "12m ago" },
    { type: "message", channel: "WhatsApp", content: "Summarized daily tasks for Sarah", time: "15m ago" },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to OpenClaw</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-green-500 font-medium">Gateway Online</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border hover:bg-card/70 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">{stat.change}</span>
                <span className="text-xs text-muted-foreground">from yesterday</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Status */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Channel Status
              </CardTitle>
              <CardDescription>Connected messaging platforms</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("channels")} className="text-primary">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {channels.map((channel) => (
                <div 
                  key={channel.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {channel.status === "connected" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium text-foreground">{channel.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {channel.status === "connected" && (
                      <span className="text-sm text-muted-foreground">{channel.messages} msgs</span>
                    )}
                    <Badge 
                      variant={channel.status === "connected" ? "default" : "secondary"}
                      className={channel.status === "connected" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                    >
                      {channel.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card/50 border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest interactions and events</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("sessions")} className="text-primary">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div 
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {activity.type === "message" ? (
                      <MessageSquare className="h-4 w-4 text-primary" />
                    ) : activity.type === "tool" ? (
                      <Zap className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Bot className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{activity.channel}</Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-foreground mt-1 truncate">{activity.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onNavigate("chat")} className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Start New Chat
            </Button>
            <Button variant="outline" onClick={() => onNavigate("channels")} className="gap-2">
              <Globe className="h-4 w-4" />
              Connect Channel
            </Button>
            <Button variant="outline" onClick={() => onNavigate("sessions")} className="gap-2">
              <Users className="h-4 w-4" />
              Manage Sessions
            </Button>
            <Button variant="outline" onClick={() => onNavigate("settings")} className="gap-2">
              <Zap className="h-4 w-4" />
              Configure Gateway
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
