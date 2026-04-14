import ReactMarkdown from "react-markdown";
import { BackButton, HeroImage } from "../../../Components/ArticleUI";
import { getMagazineBySlug } from "../../../lib/magazine";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { EnterMdxComponent } from "../../../Components/mdx-components/EnterMdxComponent";
import Image from "next/image";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const magazine = getMagazineBySlug(slug);

  const title = magazine.frontmatter.title || "Unkown title";
  const author = magazine.frontmatter.author || "Unkown author";
  const date = magazine.frontmatter.date || "Unkown date";
  const readTime = magazine.frontmatter.readTime || "Unkown read time";
  const image = magazine.frontmatter.image || "";
  const category = magazine.frontmatter.category || "Unkown category";

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        .hero-wrap * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-badge  { animation: fadeUp 0.5s ease 0.1s both; }
        .hero-title  { animation: fadeUp 0.6s ease 0.25s both; }
        .hero-author { animation: fadeUp 0.6s ease 0.45s both; }
      `}</style>

        <div
          className="hero-wrap"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {/* Background image */}

          <Image
            src={image}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            width={500}
            height={500}
            quality={90}
            priority
          />

          {/* Dark gradient overlay — stronger at bottom-left */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(10,20,40,0.72) 0%, rgba(10,20,40,0.45) 50%, rgba(10,20,40,0.15) 100%)",
            }}
          />
          <div className="top-12 left-10 absolute bg-gray-100 rounded-md w-1/18 flex justify-center z-50">
            <BackButton backprops={{ path: "/magazines" }} />
          </div>

          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "48px 52px",
              gap: 0,
            }}
          >
            {/* Category badge */}
            <div className="hero-badge" style={{ marginBottom: 20 }}>
              <span
                style={{
                  display: "inline-block",
                  background: "#2563EB",
                  color: "#fff",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  padding: "6px 16px",
                  borderRadius: 6,
                  textTransform: "uppercase",
                }}
              >
                {category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="hero-title"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: 32,
                maxWidth: 700,
                textShadow: "0 2px 24px rgba(0,0,0,0.3)",
              }}
            >
              {title}
            </h1>

            {/* Author row */}
            <div
              className="hero-author"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              {/* Avatar */}
              {/* <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&auto=format&fit=crop&crop=face"
                            alt="Elena Vance"
                            style={{
                                width: 48, height: 48,
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "2px solid rgba(255,255,255,0.8)",
                                flexShrink: 0,
                            }}
                        /> */}
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.01em",
                    marginBottom: 2,
                  }}
                >
                  {author}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {date} &nbsp;•&nbsp; {readTime}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="prose prose-lg prose-slate md:max-w-6xl mx-auto text-justify mt-10">
        <div className="prose prose-lg prose-slate max-w-none">
          <MDXRemote source={magazine.content} components={{}} />
        </div>
      </div>
    </>
  );
}
