"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Book } from "../../../lib/books";
import {
  User,
  Calendar,
  Tag,
} from "lucide-react";
import { BackButton } from "../../../Components/ArticleUI";
import Image from "next/image";
// import { MDXRemote } from "next-mdx-remote/rsc";
// import { EnterMdxComponent } from "../../../Components/mdx-components/EnterMdxComponent";

interface BookDetailClientProps {
  book: Book;
  content: string;
}


export default function BookDetailClient({
  book,
  content,
}: BookDetailClientProps) {
  return (
    <div className="min-h-screen bg-white pt-14 pb-2">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <BackButton backprops={{ path: "/books" }} />
        </motion.div>

        {/* Book Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-10">
          {/* Cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 lg:col-span-4"
          >
            <div className="relative aspect-[3/4.5] rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <Image
                height={400}
                width={400}
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-linear-to-br from-[#1c388b] to-[#101c39] text-white px-4 py-1.5 rounded-lg font-bold text-lg shadow-lg">
                {book.price}
              </div>
            </div>
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
              className="text-4xl md:text-5xl lg:text-3xl font-black text-slate-900 mb-6 leading-tight"
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
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-tighter">
                    Author
                  </p>
                  <p className="font-bold text-slate-800">{book.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Calendar size={20} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-normal">
                    Published
                  </p>
                  <p className="font-bold text-slate-800">{book.date}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-8 border-l-4 border-[#1c388b] pl-6 py-2">
              {book.description.split(book.title).map((part, idx, arr) =>
                idx < arr.length - 1 ? (
                  <React.Fragment key={idx}>
                    {part}
                    <span className="italic">{book.title}</span>
                  </React.Fragment>
                ) : (
                  part
                ),
              )}
            </p>

            {/* Markdown Content */}
            <div className="prose prose-slate lg:prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            {/* main content column */}
            {/* <div className="prose prose-lg prose-slate max-w-none">
              <MDXRemote
                source={content}
                components={{ ...EnterMdxComponent }}
              />
            </div> */}
          </motion.div>
        </div>
      </div>

      <div className=" md:w-3/4 mx-auto px-4 text-center">
        <p className="text-md font-bold text-[#1c388b] pb-4">Where you can get the book:</p>
        <Link href={book.booklinks} target="_blank" className="w-full break-all bg-[#1c388b] py-2 px-8 text-white font-bold rounded-4xl text-sm">Click here</Link>
      </div>
    </div>
  );
}


