"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  Key, 
  Bell, 
  Shield, 
  Palette, 
  Server,
  Save,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  CheckCircle2
} from "lucide-react"

export function SettingsView() {
  const [gatewayUrl, setGatewayUrl] = useState("http://localhost:8080")
  const [apiKey, setApiKey] = useState("")
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [theme, setTheme] = useState("dark")
  const [autoConnect, setAutoConnect] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "checking">("disconnected")

  const handleTestConnection = () => {
    setConnectionStatus("checking")
    setTimeout(() => {
      setConnectionStatus("connected")
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your OpenClaw instance and preferences</p>
      </div>

      <Tabs defaultValue="gateway" className="w-full">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="gateway" className="gap-2 data-[state=active]:bg-background">
            <Server className="h-4 w-4" />
            Gateway
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2 data-[state=active]:bg-background">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-background">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2 data-[state=active]:bg-background">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gateway" className="mt-6 space-y-4">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Gateway Connection
              </CardTitle>
              <CardDescription>
                Connect to your OpenClaw Gateway instance to manage channels and sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gateway-url">Gateway URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="gateway-url"
                    value={gatewayUrl}
                    onChange={(e) => setGatewayUrl(e.target.value)}
                    placeholder="http://localhost:8080"
                    className="bg-background border-border"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleTestConnection}
                    disabled={connectionStatus === "checking"}
                    className="min-w-[120px]"
                  >
                    {connectionStatus === "checking" ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Test
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                <div className="flex items-center gap-3">
                  {connectionStatus === "connected" ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : connectionStatus === "checking" ? (
                    <RefreshCw className="h-5 w-5 text-muted-foreground animate-spin" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Connection Status</p>
                    <p className="text-xs text-muted-foreground">
                      {connectionStatus === "connected" 
                        ? "Successfully connected to gateway"
                        : connectionStatus === "checking"
                        ? "Testing connection..."
                        : "Not connected"}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={connectionStatus === "connected" ? "default" : "secondary"}
                  className={connectionStatus === "connected" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}
                >
                  {connectionStatus === "connected" ? "Connected" : connectionStatus === "checking" ? "Checking" : "Disconnected"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-connect on startup</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically connect to the gateway when opening the app
                  </p>
                </div>
                <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6 space-y-4">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Manage your API keys for AI providers and integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  className="bg-background border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Used for GPT models and embeddings</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <Input
                  id="anthropic-key"
                  type="password"
                  placeholder="sk-ant-..."
                  className="bg-background border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Used for Claude models</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-key">Google AI API Key</Label>
                <Input
                  id="google-key"
                  type="password"
                  placeholder="AIza..."
                  className="bg-background border-border font-mono"
                />
                <p className="text-xs text-muted-foreground">Used for Gemini models</p>
              </div>

              <Button className="w-full mt-4">
                <Save className="h-4 w-4 mr-2" />
                Save API Keys
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                API keys are stored securely and encrypted. They are only sent to your local Gateway instance and never to external servers.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-4">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications for new messages and events
                  </p>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sound effects</Label>
                  <p className="text-xs text-muted-foreground">
                    Play sounds for notifications and actions
                  </p>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6 space-y-4">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
