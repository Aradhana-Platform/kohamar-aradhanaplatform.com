"use client";
import Image from 'next/image';
import Link from 'next/link';

// components/PostList.tsx
interface Post {
    slug: string;
    title: string;
    date: string;
    author: string;
    category: string;
    categoryColor: string;
    image: string;
    readTime: string;
    description: string;
}

interface PostListProps {
    posts: Post[];
}

export default function BlogCards({ posts }: PostListProps) {

    return (
        <section className="">
            <div className="max-w-7xl mx-auto">


                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((article) => (
                        <Link href={`/articles/${ article.slug }`}
                            key={article.slug}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={article.image || "/images/default-post.jpg"}
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    width={400}
                                    height={400}
                                />
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`px-3 py-1 ${ article.categoryColor } text-xs font-medium rounded-full`}>
                                        {article.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col grow">
                                {/* Meta */}
                                <div className="flex items-center gap-3 text-slate-500 text-sm mb-3">
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
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>{article.date}</span>
                                    </div>
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
                                        <span>{article.readTime}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-xl lg:text-xl text-slate-800 mb-3 group-hover:text-slate-900 transition-colors leading-tight"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {article.title}
                                </h3>

                                {/* Description */}
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 grow">
                                    {article.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <span className="text-sm text-slate-700">
                                        By {article.author}
                                    </span>
                                    <div className="group/btn inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors">
                                        <span>Read More</span>
                                        <svg
                                            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
      `}</style>
        </section>
    );
}