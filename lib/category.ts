

// for both...
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';


const contentDirectory = [
  path.join(process.cwd(), "content/articles"),
  path.join(process.cwd(), "content/magazine")
];

export function getAllposts() {
  let allPosts:any[] = [];

  contentDirectory.forEach((dir) => {
    const files = fs.readdirSync(dir);

    const posts = files.map((file) => {
      const slug = file.replace(".mdx", "");
      const fullPath = path.join(dir, file);
      const fileContent = fs.readFileSync(fullPath, "utf-8");

      const {data} = matter(fileContent);

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
      }
    })

   allPosts = [...allPosts, ...posts]
  })

  return allPosts;
}


export function getPostBySlug(slug: string) {
  const contentRoot = path.join(process.cwd(), "content");
  const folders = fs.readdirSync(contentRoot);

  for(const folder of folders) {
    const folderPath = path.join(contentRoot, folder);
    const fullPath = path.join(folderPath, `${slug}.mdx`);

    if(fs.existsSync(fullPath)) {
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        frontmatter: data,
        content,
      };
    }
    
  }
  throw new Error(`No post found with slug: ${slug}`);
}