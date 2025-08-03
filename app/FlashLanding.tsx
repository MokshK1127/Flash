"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Zap,
  ArrowRight,
  Sparkles,
  Twitter,
  Instagram,
  Linkedin,
  MessageCircle,
  Users,
  TrendingUp,
  Lightbulb,
  Share2,
  MessageSquareText,
  Send,
  Copy,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser, SignInButton } from "@clerk/nextjs"

export default function FlashLanding() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentText, setCurrentText] = useState("boring")
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setCurrentText("viral")
    }, 2000)
    return () => clearTimeout(timer)
  }, [])


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Button click handler that checks authentication and redirects accordingly
  const handleButtonClick = () => {
    if (isLoaded) {
      if (isSignedIn) {
        router.push("/generate")
      }
      // If not signed in, we'll handle this with conditional rendering
    }
  }

  // Render the appropriate button based on authentication status
  const renderActionButton = (text: string, className?: string) => {
    if (!isLoaded) {
      return (
        <button
          disabled
          className={`${className} opacity-50 cursor-not-allowed`}
        >
          Loading...
        </button>
      )
    }

    if (isSignedIn) {
      return (
        <button
          onClick={handleButtonClick}
          className={className}
        >
          {text}
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      )
    }

    return (
      <SignInButton mode="modal">
        <button className={className}>
          {text}
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </SignInButton>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black"></div>
      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              router.push("/")
            }}
            className="flex items-center space-x-3 group relative"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Zap className="w-6 h-6 text-white group-hover:text-blue-400 transition-all duration-300" />
              </div>
              <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-lg group-hover:bg-blue-500/40 transition-all duration-500 animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:text-blue-400 transition-all duration-300 relative">
              Flash
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></span>
            </span>
          </button>

          <div className="flex items-center space-x-8">
            {/* Navigation - positioned to the right but left of Try Flash button */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-300 hover:text-white transition-all duration-300 py-2 relative group font-medium hover:scale-105"
              >
                Features
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </button>
              <button
                onClick={() => scrollToSection("use-case")}
                className="text-gray-300 hover:text-white transition-all duration-300 py-2 relative group font-medium hover:scale-105"
              >
                Use Cases
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </button>
              <button className="text-gray-300 hover:text-white transition-all duration-300 py-2 relative group font-medium hover:scale-105">
                Pricing
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </button>
            </nav>

            {renderActionButton("Try Flash", "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium shadow-lg px-4 py-2 rounded-lg inline-flex items-center")}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/10">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">AI Content Generation</span>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9]">
              <div className="mb-4">
                <span className="text-gray-500">Your content is</span>
              </div>
              <div className="relative">
                <span
                  className={`transition-all duration-700 ${currentText === "viral" ? "bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent scale-110" : "text-red-400"}`}
                >
                  {currentText}
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-gray-400 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              Transform ideas into content that actually gets shared.
              <br />
              <span className="text-purple-400">AI that understands engagement.</span>
            </p>

            {/* Get Started Free Button */}
            <div className="mb-16">
              {renderActionButton("Get Started Free", "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center")}
            </div>

            {/* Platform icons */}
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity cursor-pointer">
                <Twitter className="w-5 h-5" />
                <span className="text-sm">Twitter</span>
              </div>
              <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity cursor-pointer">
                <Instagram className="w-5 h-5" />
                <span className="text-sm">Instagram</span>
              </div>
              <div className="flex items-center space-x-2 hover:opacity-100 transition-opacity cursor-pointer">
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "Instant Content, Real Results" section with custom visual */}
      <section id="use-case" className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Instant Content, Real Results
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Transform your ideas into engaging, high-impact content that truly connects with your audience, in
                  seconds.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-7 h-7 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">AI-Powered Creativity</h3>
                    <p className="text-gray-400">Generate unique and compelling content effortlessly.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Share2 className="w-7 h-7 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Multi-Platform Ready</h3>
                    <p className="text-gray-400">Content optimized for all your social channels.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageSquareText className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">Engagement Focused</h3>
                    <p className="text-gray-400">Drive more likes, shares, and comments.</p>
                  </div>
                </div>
              </div>

              {/* Get Started Free Button */}
              <div className="pt-8">
                {renderActionButton("Get Started Free", "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center")}
              </div>
            </div>

            {/* Right side - Custom Content Generation Visual */}
            <div className="relative bg-gray-900 rounded-3xl p-8 border border-gray-800 flex flex-col items-center justify-center h-96 overflow-hidden">
              <div className="w-full max-w-md space-y-4">
                {/* Input Area */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">Your Idea:</p>
                  <div className="text-gray-200 text-base">"Launch of new eco-friendly product line."</div>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center">
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Generate
                  </button>
                </div>

                {/* Output Area */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">Generated Content:</p>
                    <button className="p-1 rounded-md hover:bg-gray-700 transition-colors">
                      <Copy className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="text-gray-200 text-sm leading-relaxed">
                    "🌱 Big news! We're switching to 100% eco-friendly packaging. Small changes, huge impact. What
                    sustainable swaps are you making? #EcoFriendly #Sustainability"
                  </div>
                </div>
              </div>
              {/* Subtle background elements */}
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
              <div
                className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Features Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Flash transforms how you create content, making viral posts and engagement effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Smart Content Creation</h3>
                <p className="text-gray-400 leading-relaxed">
                  Generate engaging posts using natural language. Simply describe your idea and watch Flash create
                  compelling content that resonates.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Multi-Platform</h3>
                <p className="text-gray-400 leading-relaxed">
                  Create optimized content for Twitter, Instagram, LinkedIn, and more - all from a single input.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Engagement Insights</h3>
                <p className="text-gray-400 leading-relaxed">
                  Extract key insights, identify trending patterns, and generate content that drives maximum engagement
                  automatically.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Flash
            </span>
          </div>
          <div className="text-sm text-gray-500">© 2024 Flash. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}
