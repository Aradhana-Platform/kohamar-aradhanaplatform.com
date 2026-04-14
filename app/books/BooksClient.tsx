"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Book } from "../../lib/books";
import { BookOpen, User, Tag, ArrowRight, ShoppingCart } from "lucide-react";

interface BooksClientProps {
  books: Book[];
}

export default function BooksClient({ books }: BooksClientProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            <span className="text-[#1c388b]">Books</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 max-w-2xl mx-auto text-lg"
          >
            Explore Books by Amar Pandey
          </motion.p>
        </div>

        {/* Books Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {books.map((book) => (
            <motion.div
              key={book.slug}
              variants={itemVariants}
              whileHover={{ y: -1 }}
              className=" overflow-hidden group transition-all duration-300 bg-red-0 md:w-full"
            >
              <Link href={`/books/${book.slug}`}>
                <div className="relative h-[290px] overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-auto h-auto object-cover flex m-auto transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details <ArrowRight size={18} />
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-[#1c388b] to-[#101c39] text-white px-3 py-1 rounded-lg font-bold shadow-md">
                    {book.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#1c388b] text-sm font-semibold mb-2 uppercase tracking-wider">
                    <Tag size={14} />
                    {book.category}
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#1c388b] transition-colors duration-300">
                    {book.title}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-500 mb-4 hover:text-[#1c388b]">
                    <User size={16} />
                    <span className="text-sm font-medium hover:text-[#1c388b]">
                      {book.author}
                    </span>
                  </div>
                  <p className="text-slate-600 hover:text-[#1c388b] text-sm line-clamp-2 mb-4 leading-relaxed">
                    {book.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
