import Image from 'next/image';
import React from 'react';

export default function Category() {
    const categories = [
        {
            id: 1,
            title: "Systematic Theology",
            description: "Organized study of Christian doctrine",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
            gradient: "from-slate-900/60 to-slate-900/80"
        },
        {
            id: 2,
            title: "Biblical Studies",
            description: "Deep dive into Scripture",
            image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=800&q=80",
            gradient: "from-blue-900/60 to-blue-900/80"
        },
        {
            id: 3,
            title: "Church History",
            description: "Journey through Christian heritage",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
            gradient: "from-indigo-900/60 to-indigo-900/80"
        },
        {
            id: 4,
            title: "Ethics",
            description: "Moral principles and Christian living",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
            gradient: "from-slate-700/60 to-slate-800/80"
        },
        {
            id: 5,
            title: "Apologetics",
            description: "Defending the faith",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
            gradient: "from-cyan-900/60 to-slate-900/80"
        },
        {
            id: 6,
            title: "Spiritual Formation",
            description: "Growing in faith and discipleship",
            image: "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?w=800&q=80",
            gradient: "from-amber-900/60 to-slate-900/80"
        }
    ];

    return (
        <section className=" flex items-center">
            <div className="max-w-7xl mx-auto w-full">

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${ index * 0.1 }s both`
                            }}
                        >
                            {/* Background Image */}
                            <Image
                                src={category.image}
                                alt={category.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                width={400}
                                height={400}
                            />

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${ category.gradient } transition-opacity duration-500 group-hover:opacity-90`} />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <h3
                                    className="text-3xl lg:text-4xl text-white mb-2 transform transition-transform duration-500 group-hover:translate-y-[-4px]"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {category.title}
                                </h3>
                                <p className="text-slate-200 text-base lg:text-lg font-light transform transition-all duration-500 group-hover:translate-y-[-4px]">
                                    {category.description}
                                </p>

                                {/* Hover Arrow */}
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                    <div className="inline-flex items-center gap-2 text-white">
                                        <span className="text-sm font-medium">Explore</span>
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
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Border on Hover */}
                            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-3xl transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </section>
    );
}