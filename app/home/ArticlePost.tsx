import BlogCards from "../../Components/BlogCards";
import { getAllPosts } from "../../lib/posts";

export default function ArticlePost() {
  const posts = getAllPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  return (
    <div>
      <BlogCards posts={posts} />
    </div>
  );
}
