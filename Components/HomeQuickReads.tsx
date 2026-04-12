
import Link from "next/link";
import { getAllQuickReadPosts } from "../lib/quickread";
import Image from "next/image";


export default function HomeQuickReads() {
    const homeQuickPosts = getAllQuickReadPosts().slice(0, 3);

    return (
        <div className="py-18 space-y-8 px-4">
            <div className=" flex justify-around">
                <h1 className="font-bold text-gray-700">Quick Reads</h1>
                <Link href="/quick-read" className="group inline-flex items-center gap-2 ml-4 cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100 hover:text-yellow-600 font-medium transition-colors self-start sm:self-auto">
                    View All Quick Reads
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
            {homeQuickPosts.map((post) => (
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
}