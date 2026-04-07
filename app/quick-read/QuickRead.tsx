"use client"
import Image from "next/image";
import Link from "next/link";

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

export const QuickRead = ({ posts }: { posts: Post[] }) => {
    return (
        <div className="space-y-4 py-16 px-4">
            <div className="text-2xl text-start mx-auto w-2/3 font-semibold text-gray-600 flex items-center">
                <h1>Quick Read</h1>
                <Image src="https://img.freepik.com/free-vector/lightning-bolt-circle-gradient_78370-5397.jpg?semt=ais_incoming&w=740&q=80" height={40} width={40} alt="" />
            </div>

            {posts.map((post) => (
                <Link href={`/quick-read/${ post.slug }`}
                    key={post.slug}
                    className="border md:w-2/3 mx-auto border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between"
                >

                    <div className="">
                        <span
                            className={`inline-block text-xs rounded-full font-medium ${ post.categoryColor }`}
                        >
                            {post.category}
                        </span>
                        <div className="flex justify-between">

                            <h2 className="mt-0 text-base font-semibold">{post.title}</h2>
                            {post.description && (
                                <p className="mt-0 text-gray-600 text-sm">{post.description}</p>
                            )}
                            <Image src="https://img.freepik.com/free-vector/lightning-bolt-circle-gradient_78370-5397.jpg?semt=ais_incoming&w=740&q=80" height={30} width={30} alt="" />
                        </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-gray-400 text-sm">
                        {post.readTime}
                    </div>
                </Link>
            ))}
        </div>
    );
};