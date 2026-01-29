"use client";
import Image from 'next/image';

export default function BlogCards() {
    const articles = [
        {
            id: 1,
            category: "Ethics",
            categoryColor: "bg-purple-100 text-purple-700",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
            date: "Jan 25, 2026",
            readTime: "8 min read",
            title: "Christian Ethics in the Digital Age",
            description: "How do ancient moral principles apply to social media, AI, and the challenges of our connected world?",
            author: "Dr. Maria Santos"
        },
        {
            id: 2,
            category: "Biblical Studies",
            categoryColor: "bg-teal-100 text-teal-700",
            image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
            date: "Jan 25, 2026",
            readTime: "6 min read",
            title: "The Psalms: A School of Prayer",
            description: "How Israel's ancient prayer book teaches us to bring every emotion—joy, anger, despair, and praise—before God.",
            author: "Prof. Sarah Chen"
        },
        {
            id: 3,
            category: "Biblical Studies",
            categoryColor: "bg-teal-100 text-teal-700",
            image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&q=80",
            date: "Jan 25, 2026",
            readTime: "10 min read",
            title: "The Gospel of John: Light in the Darkness",
            description: "Exploring the unique theological vision of the Fourth Gospel and its profound message of divine light penetrating human...",
            author: "Prof. Sarah Chen"
        },
        {
            id: 4,
            category: "Church History",
            categoryColor: "bg-amber-100 text-amber-800",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
            date: "Jan 25, 2026",
            readTime: "7 min read",
            title: "The Reformation: Why It Still Matters",
            description: "Five hundred years later, the Protestant Reformation's core insights continue to shape Christian faith and Western...",
            author: "Rev. James Okonkwo"
        },
        {
            id: 5,
            category: "Church History",
            categoryColor: "bg-amber-100 text-amber-800",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            date: "Jan 25, 2026",
            readTime: "7 min read",
            title: "Augustine of Hippo: The Making of a Saint",
            description: "From restless seeker to towering theologian—the remarkable journey of one of Christianity's most influential thinkers.",
            author: "Rev. James Okonkwo"
        },
        {
            id: 6,
            category: "Apologetics",
            categoryColor: "bg-rose-100 text-rose-700",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
            date: "Jan 25, 2026",
            readTime: "9 min read",
            title: "Faith and Science: Partners or Rivals?",
            description: "Examining the relationship between religious faith and scientific inquiry, and why the 'conflict thesis' doesn't tell th...",
            author: "Dr. Thomas Mitchell"
        }
    ];

    return (
        <section className="">
            <div className="max-w-7xl mx-auto">


                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <article
                            key={article.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={article.image}
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
                                    <button className="group/btn inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors">
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
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
      `}</style>
        </section>
    );
}