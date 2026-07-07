import type { MetadataRoute } from "next";
import { getDetailProjects } from "@/data/projects";
import { writingPosts } from "@/data/writing";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/projects", priority: 0.9 },
    { path: "/writing", priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));

  const projectPages: MetadataRoute.Sitemap = getDetailProjects().map(
    (project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const writingPages: MetadataRoute.Sitemap = writingPosts.map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: post.featured ? 0.7 : 0.6,
  }));

  return [...staticPages, ...projectPages, ...writingPages];
}
