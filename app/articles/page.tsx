
import { getAllPosts } from "../../lib/posts";
import ArticlesClient from "./ArticlesClient";

export default function AllArticles() {
    const posts = getAllPosts();
    // console.log('this is posts = ', posts);

    return <ArticlesClient posts={posts} />;
}
