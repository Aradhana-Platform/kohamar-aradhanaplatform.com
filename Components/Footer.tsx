"use client";
import Link from 'next/link';
import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className=" bg-white text-gray-700 relative overflow-hidden">
                {/* <div className="absolute ins" /> */}

                <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 group cursor-pointer mb-4">
                                <Link href="/" className="w-14 overflow-hidden h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                                    <img src="/logo.jpg" alt="kohamar logo" className='h-full w-full object-cover' />
                                </Link>
                            </div>
                            <p className="text-gray-700 max-w-md">
                                Building exceptional digital experiences with modern technology.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li className='text-gray-600 hover:text-gray-900 transition-colors font-medium tracking-wide'><Link href="/">Home</Link></li>
                                <li className='text-gray-600 hover:text-gray-900 transition-colors font-medium tracking-wide'><Link href="/about">About</Link></li>
                                <li className='text-gray-600 hover:text-gray-900 transition-colors font-medium tracking-wide'><Link href="/articles">Articles</Link></li>
                                <li className='text-gray-600 hover:text-gray-900 transition-colors font-medium tracking-wide'><Link href="/magazines">Magazines</Link></li>
                                <li className='text-gray-600 hover:text-gray-900 transition-colors font-medium tracking-wide'><Link href="/books">Books</Link></li>
                                <li className='text-gray-600 hover:text-gray-900 transition-colors font-medium tracking-wide'><Link href="/songs">Songs</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>Help Center</li>
                                <li>Privacy Policy</li>
                                <li>Terms</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-6 text-center text-gray-700 text-sm">
                        ©{new Date().getFullYear()} Aradhana Platform. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer