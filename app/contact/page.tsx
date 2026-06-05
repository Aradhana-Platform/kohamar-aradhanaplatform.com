import React from 'react'
import type { Metadata } from "next";
import { buildMetadata } from "../../lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
    title: "Contact",
    description: "Get in touch with the Kohamar team.",
    path: "/contact",
});

const page = () => {
    return (
        <div>page</div>
    )
}

export default page