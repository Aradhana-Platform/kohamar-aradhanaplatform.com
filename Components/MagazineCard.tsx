import Image from "next/image";
import Link from "next/link";

interface Magazine {
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

interface MagazineCardProps {
    magazines: Magazine[];
}


export default function AdventureSection({ magazines }: MagazineCardProps) {

    const adventures = magazines;

    return (
        <section className="bg-white pt-10">
            {/* Title */}
            <div className="text-center py-10 ">
                <h1 className="text-4xl font-bold text-black mb-4">
                    Magazines/Bulletins
                </h1>
                <p className="text-lg text-gray-600">Enjoy short and simple write-ups</p>
            </div>

            {/* Cards */}
            <div className="px-8 py-10 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full sm:px-12 md:px-16 lg:py-20 sm:py-16">
                <div className="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                    {adventures.map((adventure, index) => (
                        <Link href={`/magazines/${ adventure.slug }`} key={index} className="relative border border-gray-100 rounded-xl hover:shadow-sm">
                            <div className="block overflow-hidden group rounded-xl shadow-lg">
                                <Image
                                    src={adventure.image}
                                    alt={adventure.title}
                                    width={500}
                                    height={300}
                                    className="object-cover w-full h-56 sm:h-64 transition-all duration-300 ease-out group-hover:scale-110"
                                />
                            </div>

                            <div className="relative mt-5 px-4 pb-4">
                                <p className="uppercase font-semibold text-xs mb-2.5 text-[#1c388b]">
                                    {adventure.date}
                                </p>

                                <h2 className="text-2xl font-bold leading-5 text-black transition-colors duration-200 hover:text-[#1c388b] mb-3">
                                    {adventure.title}
                                </h2>

                                <p className="mb-4 text-gray-700 hover:text-black">
                                    {adventure.description}
                                </p>

                                <p className="font-medium underline text-[#1c388b] cursor-pointer">
                                    Read More
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}