import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/magazine");

export function getAllPosts() {
  const files = fs.readdirSync(postsDirectory);

  return files.map((file) => {
    const slug = file.replace(".mdx", "");
    const fullPath = path.join(postsDirectory, file);
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

export function getMagazineBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(fullPath, "utf-8");

  const { data, content } = matter(fileContent);

  return {
    frontmatter: data,
    content,
  };
}

