import fs from "fs";
import path from "path";
import matter from "gray-matter";

const quickReadPostsDirectory = path.join(process.cwd(), "content/quickread");

export function getAllQuickReadPosts() {
  // console.log('quickReadPostsDirectory = ' + quickReadPostsDirectory);
  const files = fs.readdirSync(quickReadPostsDirectory);

  return files.map((file) => {
    const slug = file.replace(".mdx", "");
    console.log('slug = ' + slug);
    const fullPath = path.join(quickReadPostsDirectory, file);
    const fileContent = fs.readFileSync(fullPath, "utf-8");

    const { data } = matter(fileContent);


    return {
      slug,
      title: data.title,
      date: data.date,
      author: data.author,
      description: data.description,
      category: data.category,
      categoryColor: data.categoryColor,
      image: data.image,
      readTime: data.readTime,
    };
  });
}

export function getQuickReadPostBySlug(slug: string) {
  console.log('slug = ' + slug);
  const fullPath = path.join(quickReadPostsDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");

  const { data, content } = matter(fileContent);

  return {
    frontmatter: data,
    content,
  };
}

