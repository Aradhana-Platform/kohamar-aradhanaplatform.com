"use client";
import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className=" bg-white text-gray-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

                <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4">Logo</h3>
                            <p className="text-gray-700 max-w-md">
                                Building exceptional digital experiences with modern technology.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-700">
                                <li>Home</li>
                                <li>About</li>
                                <li>Services</li>
                                <li>Contact</li>
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
                        © 2026 Aradhana Platform. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer