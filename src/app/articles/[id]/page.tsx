import Image from "next/image";

type RecentPost = {
    id: number;
    title: string;
    slug: string;
};

type Category = {
    id: number;
    name: string;
};

const recentPosts: RecentPost[] = [
    { id: 1, title: "Blog Post 1", slug: "blog-post-1" },
    { id: 2, title: "Blog Post 2", slug: "blog-post-2" },
    { id: 3, title: "Blog Post 3", slug: "blog-post-3" },
    { id: 4, title: "Blog Post 4", slug: "blog-post-4" },
];

const categories: Category[] = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
    { id: 4, name: "Category 4" },
];

export default function BlogDetailPage() {
    return (
        <div className="flex flex-col">
            {/* Header */}
            <div className="bg-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Blog Title Here
                    </h1>
                    <p className="text-gray-600">
                        Published on April 4, 2023
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row">
                    {/* Main Content */}
                    <div className="w-full md:w-3/4 md:pr-8">
                        <div className="relative w-full h-[420px] mb-8">
                            <Image
                                src="https://images.unsplash.com/photo-1506157786151-b8491531f063"
                                alt="Blog Featured Image"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>

                        <article className="prose max-w-none prose-gray">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nulla facilisi. Sed sit amet feugiat eros, eget eleifend dolor.
                                Proin maximus bibendum felis, id fermentum odio vestibulum id.
                            </p>

                            <p>
                                Suspendisse potenti. Mauris euismod, magna sit amet aliquam
                                dapibus, ex sapien porta nisl, vel auctor orci velit in risus.
                                Fusce gravida bibendum dui, id volutpat felis dignissim a.
                            </p>

                            <p>
                                Nulla facilisi. Sed venenatis pretium ante, sed tempor turpis
                                sagittis ac. Pellentesque habitant morbi tristique senectus et
                                netus et malesuada fames ac turpis egestas.
                            </p>
                        </article>
                    </div>

                    {/* Sidebar */}
                    <aside className="w-full md:w-1/4 mt-8 md:mt-0">
                        {/* Recent Posts */}
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Recent Posts
                            </h2>
                            <ul className="space-y-2">
                                {recentPosts.map((post) => (
                                    <li key={post.id}>
                                        <a
                                            href={`/blog/${ post.slug }`}
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            {post.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Categories
                            </h2>
                            <ul className="space-y-2">
                                {categories.map((cat) => (
                                    <li key={cat.id}>
                                        <a
                                            href="#"
                                            className="text-gray-700 hover:text-gray-900"
                                        >
                                            {cat.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
