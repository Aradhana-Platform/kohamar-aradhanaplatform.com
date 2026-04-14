
// "use client";
import BlogCards from '../../Components/BlogCards';
import Category from '../../Components/Category';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ArticlePost from './ArticlePost';
import HomeFeature from '../../Components/HomeFeature';
import { QuickRead } from '../quick-read/QuickRead';
import HomeQuickReads from '../../Components/HomeQuickReads';
// import { getAllPosts } from '../../lib/posts';

const Home = () => {
    // const posts = getAllPosts();


    return (<>
        <div className=" bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='40' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />
            {/* Hero Section */}
            <main className="relative pt-32 pb-20 px-6 lg:py-32 lg:px-12 flex flex-col justify-center">
                <div className="max-w-6xl mx-auto relative w-full">
                    {/* Category Tag */}
                    <div className="flex items-center gap-2 mb-4" style={{ animation: 'fadeIn 0.8s ease-out' }}>
                        <svg
                            className="w-5 h-5 text-amber-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                        <span className="text-amber-400 uppercase tracking-widest text-sm font-medium">
                            Engaging the Word and The World
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="mb-2" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
                        <div
                            className="text-5xl sm:text-6xl lg:text-7xl xl:text-6xl text-white leading-tight mb-4"
                            style={{ fontFamily: "'Libre Baskerville', serif" }}
                        >
                            כה אמר
                        </div>
                        <div
                            className="text-5xl sm:text-6xl lg:text-7xl xl:text-6xl text-amber-400 leading-tight italic"
                            style={{ fontFamily: "'Libre Baskerville', serif" }}
                        >
                            Thinking Scripturally
                        </div>
                    </h1>

                    {/* Description */}
                    <p
                        className="text-slate-200 text-lg sm:text-xl lg:text-xl max-w-3xl mb-8 leading-relaxed font-normal"
                        style={{ animation: 'fadeInUp 0.8s ease-out 0.2s both' }}
                    >
                        Scripture. Exegesis. Exposition. Theology. Praxis. <br />
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className="flex flex-col sm:flex-row gap-4"
                        style={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}
                    >
                        <Link href="/articles" className="group px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium rounded-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2">
                            <span>Explore Articles</span>
                            <svg
                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/40">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div
                        className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
                        style={{ animation: 'bounce 2s ease-in-out infinite' }}
                    >
                        <div
                            className="w-2 h-3 bg-white/50 rounded-full"
                        // style={{ animation: 'scroll 2s ease-in-out infinite' }}
                        />
                    </div>
                </div>
            </main>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes scroll {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
        </div>

        {/* quicks reads */}
        <HomeQuickReads />

        {/* featured article */}
        <HomeFeature />

        {/* blog cards */}
        <section className='container mx-auto py-24 px-6 bg-white'>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4 max-w-7xl mx-auto">
                <div>
                    <p className="text-amber-600 uppercase tracking-widest text-xs font-semibold mb-2">
                        Latest Writings
                    </p>
                    <h2
                        className="text-3xl py-1 lg:text-4xl text-slate-800"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Recent Articles
                    </h2>
                </div>
                <Link href="/articles" className="group inline-flex items-center gap-2 ml-4 cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100 hover:text-yellow-600 font-medium transition-colors self-start sm:self-auto">
                    View All Articles
                    <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                    </svg>
                </Link>
            </div>
            <ArticlePost />
            {/* <BlogCards posts={posts} /> */}
        </section>

        {/* explore topics */}
        <section className='py-16 px-6 lg:px-12 bg-gradient-to-br from-slate-50 to-stone-50 min-h-screen'>
            {/* Header */}
            <div className="text-center mb-16">
                <p className="text-amber-600 uppercase tracking-widest text-xs font-semibold mb-3">
                    Explore Topics
                </p>
                <h2
                    className="text-3xl lg:text-4xl text-slate-800"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Browse by Category
                </h2>
            </div>
            <Category />
        </section>
    </>

    )
}

export default Home;