"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  Zap,
  Clock,
  Target,
  Users,
  BarChart3,
  Youtube,
  Megaphone,
} from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import { useEffect, useState } from "react";

interface ClientLandingPageProps {
  userId: string | null;
}

export function ClientLandingPage({ userId }: ClientLandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-1 bg-blue-500/30 rounded-full animate-pulse-subtle"></div>
        <div
          className="absolute top-40 right-20 w-1 h-1 bg-blue-500/20 rounded-full animate-pulse-subtle"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-1 h-1 bg-blue-500/25 rounded-full animate-pulse-subtle"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <div className="text-center py-20 lg:py-32 relative">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Main Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Zap className="w-12 h-12 text-blue-500 mx-auto animate-flash" />
              </div>
            </div>

            {/* Hero Text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Create Content in a
              <span className="block text-5xl sm:text-6xl lg:text-7xl text-blue-500">
                ⚡ FLASH ⚡
              </span>
            </h1>

            <p className="text-lg sm:text-xl mb-8 text-gray-400 max-w-2xl mx-auto animate-fade-in">
              Lightning-fast AI content generation for all your platforms.
              <br />
              <span className="text-blue-400 font-medium">
                Generate ads for your company in a FLASH!
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium transition-all duration-300"
              >
                <Link href="/generate">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Creating
                </Link>
              </Button>
              <Button
                asChild
                className="bg-transparent border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg text-base font-medium transition-all duration-300"
              >
                <Link href="#platforms">
                  <Target className="w-4 h-4 mr-2" />
                  View Platforms
                </Link>
              </Button>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {[
                { value: "5s", label: "Generation Time" },
                { value: "500+", label: "Active Users" },
                { value: "150%", label: "Engagement Boost" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-blue-500 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platforms Section */}
        <div className="py-20" id="platforms">
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center text-white">
              Create for Every Platform
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: TwitterIcon,
                  title: "Twitter",
                  subtitle: "Viral Threads",
                  description:
                    "Create engaging Twitter threads that boost your reach instantly.",
                  color: "text-blue-400",
                },
                {
                  icon: InstagramIcon,
                  title: "Instagram",
                  subtitle: "Engaging Captions",
                  description:
                    "Generate captivating Instagram captions that increase engagement.",
                  color: "text-pink-400",
                },
                {
                  icon: LinkedinIcon,
                  title: "LinkedIn",
                  subtitle: "Professional Posts",
                  description:
                    "Craft professional LinkedIn content that establishes thought leadership.",
                  color: "text-blue-600",
                },
                {
                  icon: Youtube,
                  title: "YouTube",
                  subtitle: "Video Scripts",
                  description:
                    "Generate compelling video scripts and descriptions for YouTube content.",
                  color: "text-red-500",
                },
                {
                  icon: Megaphone,
                  title: "Company Ads",
                  subtitle: "Marketing Copy",
                  description:
                    "Create powerful ad copy and marketing content for your business.",
                  color: "text-green-500",
                },
              ].map((platform, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:bg-gray-800/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                >
                  <div
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-all duration-300`}
                  >
                    <platform.icon
                      className={`w-5 h-5 ${platform.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {platform.title}
                  </h3>
                  <p className="text-blue-400 text-sm mb-3 font-medium">
                    {platform.subtitle}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {platform.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center text-white">
              Why Choose Flash?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "Generate content in seconds, not hours. From idea to post in a FLASH!",
                },
                {
                  icon: Target,
                  title: "AI-Powered",
                  description:
                    "Advanced AI that understands your brand and creates engaging content.",
                },
                {
                  icon: BarChart3,
                  title: "Results Driven",
                  description:
                    "Every piece of content is optimized for maximum engagement and reach.",
                },
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-20">
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center text-white">
              ⚡ Lightning-Fast Results ⚡
            </h2>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Generate content in seconds, not hours",
                  "Create ads for your company in a FLASH",
                  "Boost engagement across all platforms",
                  "Save hours of content planning",
                  "Professional quality content every time",
                  "Scale your social media presence",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-20 relative">
          <div
            className={`transition-all duration-1000 delay-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-white">
              Ready to Create in a FLASH? ⚡
            </h2>

            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
              Join creators who are already generating amazing content in
              seconds!
            </p>

            {userId ? (
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg text-lg font-medium transition-all duration-300"
              >
                <Link href="/generate">
                  <Zap className="w-5 h-5 mr-2" />
                  Generate Content Now
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <SignUpButton mode="modal">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg text-lg font-medium transition-all duration-300">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Free
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Button>
              </SignUpButton>
            )}

            <p className="mt-6 text-gray-500 text-sm">
              ⚡ No credit card required • Start creating in seconds ⚡
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
