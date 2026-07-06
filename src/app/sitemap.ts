import type { MetadataRoute } from "next";
import { getDetailProjects } from "@/data/projects";
import { writingPosts } from "@/data/writing";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = ["", "/about", "/projects", "/writing"].map(
    (path) => ({ url: `${SITE_URL}${path}` }),
  );

  const projectPages: MetadataRoute.Sitemap = getDetailProjects().map(
    (project) => ({ url: `${SITE_URL}/projects/${project.slug}` }),
  );

  const writingPages: MetadataRoute.Sitemap = writingPosts.map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticPages, ...projectPages, ...writingPages];
}
