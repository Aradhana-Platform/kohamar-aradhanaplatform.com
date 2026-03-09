"use client";
import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const handleClose = () => {
        setMobileMenuOpen(false);
    }

    return (
        <div>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3 group cursor-pointer">
                            <Link href="/" className="w-14 overflow-hidden h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                <img src="/logo.jpg" alt="kohamar logo" className='h-full w-full object-cover' />
                            </Link>
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
                                href="/about"
                                className="text-slate-700 hover:text-slate-900 transition-colors font-medium tracking-wide"
                            >
                                About
                            </Link>
                            <Link
                                href="/articles"
                                className="text-slate-700 hover:text-slate-900 transition-colors font-medium tracking-wide"
                            >
                                Articles
                            </Link>
                            <Link
                                href="/magazines"
                                className="text-slate-700 hover:text-slate-900 transition-colors font-medium tracking-wide"
                            >
                                Magazines
                            </Link>
                            <Link
                                href="/books"
                                className="text-slate-700 hover:text-slate-900 transition-colors font-medium tracking-wide"
                            >
                                Books
                            </Link>
                            <Link
                                href="/songs"
                                className="text-slate-700 hover:text-slate-900 transition-colors font-medium tracking-wide"
                            >
                                Songs
                            </Link>
                            {/* <Link
                                href="/developer"
                                className="text-slate-700 hover:text-slate-900 transition-colors font-medium tracking-wide"
                            >
                                Developer Section
                            </Link> */}

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
                                onClick={handleClose}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="block text-slate-700 hover:text-slate-900 transition-colors font-medium"
                                onClick={handleClose}
                            >
                                About
                            </Link>
                            <Link
                                href="/articles"
                                className="block text-slate-700 hover:text-slate-900 transition-colors font-medium"
                                onClick={handleClose}
                            >
                                Articles
                            </Link>
                            <Link
                                href="/magazines"
                                className="block text-slate-700 hover:text-slate-900 transition-colors font-medium"
                                onClick={handleClose}
                            >
                                Magazines
                            </Link>
                            <Link
                                href="/books"
                                className="block text-slate-700 hover:text-slate-900 transition-colors font-medium"
                                onClick={handleClose}
                            >
                                Books
                            </Link>
                            <Link
                                href="/songs"
                                className="block text-slate-700 hover:text-slate-900 transition-colors font-medium"
                                onClick={handleClose}
                            >
                                Songs
                            </Link>
                        </div>
                    )}
                </div>
                {/* </div> */}
            </nav>


        </div>
    );
}