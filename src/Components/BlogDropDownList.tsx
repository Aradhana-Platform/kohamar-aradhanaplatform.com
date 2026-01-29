"use client";
import Link from 'next/link';
import React from 'react'

type Category = {
    label: string;
    href: string;
}

type BlogDropDownListProps = {
    items: Category[];
    isDesktopListOpen: boolean;
}

const BlogDropDownList: React.FC<BlogDropDownListProps> = ({ items, isDesktopListOpen }) => {
    return (
        <>
            <div className={`absolute left-0 mt-2 w-full bg-white shadow-lg transition-all duration-200 z-50 ${ isDesktopListOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                <div className="py-2">
                    {items.map((category) => (
                        <Link
                            key={category.label}
                            href={category.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                            {category.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BlogDropDownList