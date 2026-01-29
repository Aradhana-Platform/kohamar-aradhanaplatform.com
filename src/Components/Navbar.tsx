"use client";
import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    return (
        <div>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <span className="text-2xl text-slate-800" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                                Theological
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link
                                href="/"
                                className="text-slate-700 hover:text-slate-900 transition-colors font-medium tracking-wide"
                            >
                                Home
                            </Link>
                            <Link
                                href="/articles"
                                className="text-slate-700 hover:text-slate-900 transition-colors font-medium tracking-wide"
                            >
                                Articles
                            </Link>
                            <Link
                                href="/about"
                                className="text-slate-700 hover:text-slate-900 transition-colors font-medium tracking-wide"
                            >
                                About
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-slate-700 hover:text-slate-900"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 space-y-3">
                            <Link
                                href="/"
                                className="block text-slate-700 hover:text-slate-900 transition-colors font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/articles"
                                className="block text-slate-700 hover:text-slate-900 transition-colors font-medium"
                            >
                                Articles
                            </Link>
                            <Link
                                href="/about"
                                className="block text-slate-700 hover:text-slate-900 transition-colors font-medium"
                            >
                                About
                            </Link>
                        </div>
                    )}
                </div>
            </nav>


        </div>
    );
}