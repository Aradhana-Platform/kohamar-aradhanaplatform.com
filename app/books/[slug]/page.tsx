import { getBookBySlug } from "../../../lib/books";
import BookDetailClient from "./BookDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BookDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const bookData = getBookBySlug(slug);

    if (!bookData) {
        notFound();
    }

    return (
        <>
            <BookDetailClient book={bookData.frontmatter} content={bookData.content} />
        </>
    );
}
