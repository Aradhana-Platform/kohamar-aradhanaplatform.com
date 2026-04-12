import Image from "next/image";
import { getAllPosts } from "../lib/posts";
import Link from "next/link";


export default function HomeFeature() {
    const posts = getAllPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 1);

    return (
        <section className="py-14 md:py-20 px-6 lg:px-12 bg-gradient-to-br from-slate-50 to-stone-100 flex items-center">
            <div className="max-w-7xl mx-auto w-full">
                {/* Section Header */}
                <div className="flex items-center gap-2 mb-10">
                    <svg
                        className="w-6 h-6 text-amber-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <h2
                        className="text-slate-700 uppercase tracking-widest text-sm font-semibold"
                        style={{ letterSpacing: '0.15em' }}
                    >
                        Featured Article
                    </h2>
                </div>

                {/* Article Card */}
                {posts.map((featurePost) => (
                    <div key={featurePost.category} className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Image */}
                        <div className="relative group overflow-hidden rounded-3xl shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-transparent z-10" />
                            <Image
                                src={featurePost.image}
                                alt="Theological library with ancient books"
                                className="w-full h-[300px] md:h-[400px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
                                width={400}
                                height={600}
                            />
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            {/* Category Badge */}
                            <div className="inline-block">
                                <span className={`px-3 py-1 ${ featurePost.categoryColor } text-black text-xs font-medium rounded-lg shadow-lg`}>
                                    {featurePost.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h3
                                className="text-4xl lg:text-5xl xl:text-5xl text-slate-800 leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {featurePost.title}
                            </h3>

                            {/* Description */}
                            <p className="text-slate-600 text-lg lg:text-lg leading-relaxed">
                                {featurePost.description}
                            </p>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm lg:text-base">
                                <span className="font-medium text-slate-700">{featurePost.author}</span>
                                <span className="w-1 h-1 bg-slate-400 rounded-full" />
                                <span>{featurePost.date}</span>
                                <span className="w-1 h-1 bg-slate-400 rounded-full" />
                                <div className="flex items-center gap-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>8 min read</span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4">
                                <Link href={`/articles/${ featurePost.slug }`} className="group inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-lg transition-all duration-300">
                                    <span>Read Full Article</span>
                                    <svg
                                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
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
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
              `}</style>
        </section>
    )
}