import fs from "fs";
import path from "path";
import matter from "gray-matter";

const booksDirectory = path.join(process.cwd(), "content/books");

export interface Book {
  slug: string;
  title: string;
  author: string;
  price: string;
  date: string;
  description: string;
  image: string;
  category: string;
}

export function getAllBooks(): Book[] {
  if (!fs.existsSync(booksDirectory)) {
    return [];
  }
  const files = fs.readdirSync(booksDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(".md", "");
      const fullPath = path.join(booksDirectory, file);
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title,
        author: data.author,
        price: data.price,
        date: data.date,
        description: data.description,
        image: data.image,
        category: data.category,
      };
    });
}

export function getBookBySlug(slug: string) {
  const fullPath = path.join(booksDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContent = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as Book,
    content,
  };
}
