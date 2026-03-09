import React from "react";
import { getAllBooks } from "../../lib/books";
import BooksClient from "./BooksClient";

export default async function BooksPage() {
    const books = getAllBooks();

    return (
        <>
            <BooksClient books={books} />
        </>
    );
}
