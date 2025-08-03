"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Loader2,
  Upload,
  Copy,
  Twitter,
  Instagram,
  Linkedin,
  Zap,
  Youtube,
  ArrowRight,
  Sparkles,
  Send,
  Star,
  Download,
} from "lucide-react"
import { GoogleGenerativeAI, type Part } from "@google/generative-ai"
import ReactMarkdown from "react-markdown"
import { Navbar } from "@/components/Navbar"
import { SignInButton, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import {
  getUserPoints,
  saveGeneratedContent,
  updateUserPoints,
  getGeneratedContentHistory,
  createOrUpdateUser,
} from "@/utils/db/actions"
import { TwitterMock } from "@/components/social-mocks/TwitterMock"
import { InstagramMock } from "@/components/social-mocks/InstagramMock"
import { LinkedInMock } from "@/components/social-mocks/LinkedInMock"
import Link from "next/link"

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

const contentTypes = [
  { value: "twitter", label: "Twitter", icon: Twitter, color: "bg-blue-500" },
  { value: "instagram", label: "Instagram", icon: Instagram, color: "bg-pink-500" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, color: "bg-blue-600" },
  { value: "youtube", label: "YouTube", icon: Youtube, color: "bg-red-500" },
]

const MAX_TWEET_LENGTH = 280
const POINTS_PER_GENERATION = 5

interface HistoryItem {
  id: number
  contentType: string
  prompt: string
  content: string
  createdAt: Date
}

export default function GenerateContent() {
  const { isLoaded, isSignedIn, user } = useUser()
  const router = useRouter()
  const [contentType, setContentType] = useState(contentTypes[0].value)
  const [prompt, setPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [userPoints, setUserPoints] = useState<number | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null)
  const [showAllHistory, setShowAllHistory] = useState(false)

  useEffect(() => {
    if (!apiKey) {
      console.error("Gemini API key is not set")
    }
  }, [])

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/")
    } else if (isSignedIn && user) {
      fetchUserPoints()
      fetchContentHistory()
    }
  }, [isLoaded, isSignedIn, user, router])

  const fetchUserPoints = async () => {
    if (user?.emailAddresses[0]?.emailAddress) {
      const userEmail = user.emailAddresses[0].emailAddress
      const points = await getUserPoints(userEmail)
      setUserPoints(points)
      if (points === 0) {
        const updatedUser = await createOrUpdateUser(user.id, userEmail, user.fullName || "")
        if (updatedUser) {
          setUserPoints(updatedUser.points)
        }
      }
    }
  }

  const fetchContentHistory = async () => {
    if (user?.emailAddresses[0]?.emailAddress) {
      const userEmail = user.emailAddresses[0].emailAddress
      const contentHistory = await getGeneratedContentHistory(userEmail)
      setHistory(contentHistory)
    }
  }

  const handleGenerate = async () => {
    if (!genAI || !user?.emailAddresses[0]?.emailAddress || userPoints === null || userPoints < POINTS_PER_GENERATION) {
      alert("Not enough points or API key not set.")
      return
    }

    setIsLoading(true)
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
      let promptText = `Generate ${contentType} content about "${prompt}".`

      if (contentType === "twitter") {
        promptText += " Provide a thread of 5 tweets, each under 280 characters."
      } else if (contentType === "youtube") {
        promptText +=
          " Create a compelling YouTube video script with an engaging hook, main content points, and call-to-action. Include timestamps and speaking notes."
      }

      let imagePart: Part | null = null
      if (contentType === "instagram" && image) {
        const reader = new FileReader()
        const imageData = await new Promise<string>((resolve) => {
          reader.onload = (e) => {
            if (e.target && typeof e.target.result === "string") {
              resolve(e.target.result)
            } else {
              resolve("")
            }
          }
          reader.readAsDataURL(image)
        })

        const base64Data = imageData.split(",")[1]
        if (base64Data) {
          imagePart = {
            inlineData: {
              data: base64Data,
              mimeType: image.type,
            },
          }
        }
        promptText += " Describe the image and incorporate it into the caption."
      }

      const parts: (string | Part)[] = [promptText]
      if (imagePart) parts.push(imagePart)

      const result = await model.generateContent(parts)
      const generatedText = result.response.text()

      let content: string[]
      if (contentType === "twitter") {
        content = generatedText.split("\n\n").filter((tweet) => tweet.trim() !== "")
      } else {
        content = [generatedText]
      }

      setGeneratedContent(content)

      // Update points
      const updatedUser = await updateUserPoints(user.emailAddresses[0].emailAddress, -POINTS_PER_GENERATION)
      if (updatedUser) {
        setUserPoints(updatedUser.points)
      }

      // Save generated content
      const savedContent = await saveGeneratedContent(
        user.emailAddresses[0].emailAddress,
        content.join("\n\n"),
        prompt,
        contentType,
      )

      if (savedContent) {
        setHistory((prevHistory) => [savedContent, ...prevHistory])
      }
    } catch (error) {
      console.error("Error generating content:", error)
      setGeneratedContent(["An error occurred while generating content."])
    } finally {
      setIsLoading(false)
    }
  }

  const handleHistoryItemClick = (item: HistoryItem) => {
    setSelectedHistoryItem(item)
    setContentType(item.contentType)
    setPrompt(item.prompt)
    setGeneratedContent(item.contentType === "twitter" ? item.content.split("\n\n") : [item.content])
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Content copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }

  const downloadContent = () => {
    const content = generatedContent.join("\n\n")
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${contentType}-content-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderContentMock = () => {
    if (generatedContent.length === 0) return null

    switch (contentType) {
      case "twitter":
        return <TwitterMock content={generatedContent} />
      case "instagram":
        return <InstagramMock content={generatedContent[0]} />
      case "linkedin":
        return <LinkedInMock content={generatedContent[0]} />
      case "youtube":
        return (
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Youtube className="mr-3 h-5 w-5 text-red-400" />
              <h3 className="text-lg font-medium text-white capitalize">YouTube Script</h3>
            </div>
            <div className="bg-black/50 rounded-lg p-4">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{generatedContent[0]}</pre>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0])
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
          <span className="text-xl text-white">Loading...</span>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
          <div className="text-center bg-white/5 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/10 max-w-md w-full">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Flash</h1>
            <p className="text-gray-400 mb-8 leading-relaxed">Sign in to start creating content.</p>
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center w-full justify-center">
                Sign In
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <Navbar />

      <div className="relative z-10 pt-20">
        {/* Workspace Header */}
        <div className="border-b border-gray-800 bg-gray-950">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-white">Workspace</h1>
              <div className="flex items-center bg-gray-800 rounded-xl px-3 py-1">
                <Zap className="h-4 w-4 text-yellow-400 mr-2" />
                <span className="text-sm text-white font-semibold">{userPoints || 0} points</span>
              </div>
            </div>
            <Link href="/pricing">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">
                Generate More Points
              </button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
            {/* Sidebar */}
            <div className="col-span-3 bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">History</h2>
                <button
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {showAllHistory ? "Hide All" : "Show All"}
                </button>
              </div>

              {showAllHistory && (
                <div className="space-y-3">
                  {history.map((item) => {
                    const typeConfig = contentTypes.find((t) => t.value === item.contentType)
                    const IconComponent = typeConfig?.icon || Sparkles
                    return (
                      <div
                        key={item.id}
                        className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors border border-gray-700"
                        onClick={() => handleHistoryItemClick(item)}
                      >
                        <div className="flex items-center mb-2">
                          <div
                            className={`w-6 h-6 ${typeConfig?.color || "bg-gray-600"} rounded flex items-center justify-center mr-2`}
                          >
                            <IconComponent className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-white capitalize">{item.contentType}</span>
                          <span className="ml-auto text-xs text-gray-500">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 truncate">{item.prompt}</p>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="col-span-5 bg-gray-900 rounded-xl border border-gray-800 p-6">
              {/* Platform Selection */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {contentTypes.map((type) => {
                  const IconComponent = type.icon
                  return (
                    <button
                      key={type.value}
                      onClick={() => setContentType(type.value)}
                      className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        contentType === type.value
                          ? `${type.color} text-white`
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  )
                })}
              </div>

              {/* Input Area */}
              <div className="mb-6">
                <Textarea
                  placeholder="What would you like to create content about?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={8}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg resize-none text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              {contentType === "instagram" && (
                <div className="mb-6">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex items-center justify-center w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    <span>{image ? image.name : "Upload Image (Optional)"}</span>
                  </label>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isLoading || !prompt || userPoints === null || userPoints < POINTS_PER_GENERATION}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Generate ({POINTS_PER_GENERATION} points)
                  </>
                )}
              </button>

              {/* Generated Content */}
              {generatedContent.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Output</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => copyToClipboard(generatedContent.join("\n\n"))}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4 text-gray-400" />
                      </button>
                      <button
                        onClick={downloadContent}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                        title="Download content"
                      >
                        <Download className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {contentType === "twitter" ? (
                    <div className="space-y-3">
                      {generatedContent.map((tweet, index) => (
                        <div key={index} className="p-3 bg-gray-800 border border-gray-700 rounded-lg">
                          <ReactMarkdown className="prose prose-invert prose-sm max-w-none mb-2 text-gray-300">
                            {tweet}
                          </ReactMarkdown>
                          <div className="flex justify-between items-center text-gray-500 text-xs">
                            <span>Tweet {index + 1}</span>
                            <span>
                              {tweet.length}/{MAX_TWEET_LENGTH}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg">
                      <ReactMarkdown className="prose prose-invert prose-sm max-w-none text-gray-300">
                        {generatedContent[0]}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Preview Panel */}
            <div className="col-span-4 bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-white mb-6">Preview</h2>
              {generatedContent.length > 0 ? (
                <div className="space-y-4">{renderContentMock()}</div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <div className="text-center">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Preview will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
