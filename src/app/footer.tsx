"use client";

import Creators from "@/components/Creators";
import { Globe, Linkedin, Coffee, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const upiId = "9636164368@ptaxis"; // Replace with your actual UPI ID

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative mt-16 bg-gradient-to-br from-slate-900 via-gray-900 to-black border-t border-slate-800/50">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-12 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-8 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Main content */}
        <Creators />
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Brand section */}
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Writer Room
              </h3>
              <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 rounded-full"></div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Crafting stories and ideas with passion. Built at a hackathon with
              ☕ & endless creativity.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              © {new Date().getFullYear()} Writer Room. All rights reserved.
            </p>
          </div>

          {/* Buy me coffee section */}
          <div className="flex-1 max-w-sm">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-orange-500/30 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                  <Coffee className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="text-lg font-semibold text-white">
                  Buy me a coffee
                </h4>
              </div>

              <p className="text-gray-400 text-sm mb-4">
                Support the project and fuel more late-night coding sessions!
              </p>

              <div className="bg-slate-800/70 border border-slate-600/50 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-gray-300 font-mono break-all">
                    {upiId}
                  </span>
                  <button
                    onClick={copyUPI}
                    className="flex-shrink-0 p-1.5 hover:bg-slate-700 rounded transition-colors"
                    title="Copy UPI ID"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {copied && (
                <p className="text-xs text-green-400 animate-fade-in">
                  UPI ID copied to clipboard!
                </p>
              )}
            </div>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-start lg:items-end gap-4">
            <h4 className="text-sm font-medium text-gray-300 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a
                href="https://betalectic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-slate-800/50 hover:bg-blue-500/20 border border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all duration-300"
              >
                <Globe className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/company/betalectic/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-slate-800/50 hover:bg-gray-500/20 border border-slate-700/50 hover:border-gray-500/50 rounded-xl transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="mt-12 pt-8 border-t border-gradient-to-r from-transparent via-slate-700/50 to-transparent">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <span>Made with 💜 for the community</span>
            <span>Powered by creativity & caffeine</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
}
