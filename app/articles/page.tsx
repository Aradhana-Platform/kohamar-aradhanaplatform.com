
import { getAllPosts } from "../../lib/posts";
import ArticlesClient from "./ArticlesClient";

export default function AllArticles() {
    const posts = getAllPosts();

    return <ArticlesClient posts={posts} />;
}
