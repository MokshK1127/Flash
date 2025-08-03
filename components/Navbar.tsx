"use client";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  SignedIn,
  useAuth,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { userId } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>

      <nav className="container mx-auto px-4 sm:px-8 py-4 sm:py-6 relative">
        <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-3 group relative"
            >
              <div className="relative">
                <Zap className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:bg-blue-500/40 transition-all duration-500 animate-pulse"></div>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-all duration-300 relative">
                Flash
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500"></span>
              </span>
            </button>
          </div>

          <button
            className="sm:hidden text-white focus:outline-none hover:text-blue-400 transition-all duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div
            className={`w-full sm:w-auto ${
              isMenuOpen ? "block" : "hidden"
            } sm:block mt-4 sm:mt-0`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
              {[
                // { name: "Features", href: "#features" },
                { name: "Pricing", href: "/pricing" },
                { name: "Docs", href: "/docs" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-all duration-300 py-2 sm:py-0 relative group font-medium hover:scale-105"
                >
                  {item.name}
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  <div className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                </Link>
              ))}

              {userId && (
                <Link
                  href="/generate"
                  className="text-gray-300 hover:text-white transition-all duration-300 py-2 sm:py-0 relative group font-medium hover:scale-105"
                >
                  Dashboard
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  <div className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                </Link>
              )}

              <SignedOut>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-4 sm:mt-0">
                  <SignInButton mode="modal">
                    <button className="text-gray-300 hover:text-white transition-all duration-300 py-2 sm:py-0 font-medium hover:scale-105 relative group">
                      Sign In
                      <div className="absolute inset-0 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 transition-all duration-500 font-medium hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 mt-2 sm:mt-0 rounded-lg overflow-hidden group">
                      <span className="relative z-10">Get Started</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 hover:scale-110 transition-transform duration-300",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
