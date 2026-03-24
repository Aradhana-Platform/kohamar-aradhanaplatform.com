"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Book } from "../../../lib/books";
import { ArrowLeft, User, Calendar, Tag, Download, Share2, Bookmark } from "lucide-react";

interface BookDetailClientProps {
    book: Book;
    content: string;
}

export default function BookDetailClient({ book, content }: BookDetailClientProps) {
    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-6 lg:px-12">
                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-10"
                >
                    <Link
                        href="/books"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#1c388b] font-medium transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Collection
                    </Link>
                </motion.div>

                {/* Book Hero Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Cover */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-5 lg:col-span-4"
                    >
                        <div className="relative aspect-[3/4.5] rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-gradient-to-br from-[#1c388b] to-[#101c39] text-white px-4 py-1.5 rounded-lg font-bold text-lg shadow-lg">
                                {book.price}
                            </div>
                        </div>

                        {/* <div className="mt-8 flex flex-col gap-4">
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-blue-200 transition-all active:scale-95">
                                <Download size={20} /> Download PDF
                            </button>
                            <div className="flex gap-4">
                                <button className="flex-1 border-2 border-slate-100 hover:border-blue-100 hover:bg-blue-50 text-slate-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                                    <Share2 size={18} /> Share
                                </button>
                                <button className="flex-1 border-2 border-slate-100 hover:border-blue-100 hover:bg-blue-50 text-slate-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                                    <Bookmark size={18} /> Save
                                </button>
                            </div>
                        </div> */}
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="md:col-span-7 lg:col-span-8 flex flex-col"
                    >
                        <div className="flex items-center gap-2 text-[#1c388b] text-sm font-bold uppercase tracking-widest mb-4">
                            <Tag size={16} /> {book.category}
                        </div>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight"
                            style={{ fontFamily: "'Libre Baskerville', serif" }}
                        >
                            {book.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 mb-8 text-slate-600 border-b border-slate-100 pb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <User size={20} className="text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Author</p>
                                    <p className="font-bold text-slate-800">{book.author}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                    <Calendar size={20} className="text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Published</p>
                                    <p className="font-bold text-slate-800">{book.date}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-xl text-slate-600 leading-relaxed italic mb-8 border-l-4 border-blue-600 pl-6 py-2">
                            {book.description}
                        </p>

                        {/* Markdown Content */}
                        <div className="prose prose-slate lg:prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
