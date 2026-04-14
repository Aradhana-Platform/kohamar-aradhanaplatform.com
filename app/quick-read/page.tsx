import { getAllQuickReadPosts } from "../../lib/quickread";
import { QuickRead } from "./QuickRead";

export default function AllArticles() {
  const posts = getAllQuickReadPosts();
  // console.log('this is posts = ', posts);

  return <QuickRead posts={posts} />;
}
