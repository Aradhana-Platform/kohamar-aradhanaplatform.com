import React from "react";
import { getAllBooks } from "../../lib/books";
import Navbar from "../../Components/Navbar";
import BooksClient from "./BooksClient";

export default async function BooksPage() {
    const books = getAllBooks();

    return (
        <>
            <Navbar />
            <BooksClient books={books} />
        </>
    );
}
