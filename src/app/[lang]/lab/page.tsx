"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { useLanguage } from "@/components/language-provider";
import { CONTENT } from "@/lib/content";
import { localizeHref } from "@/lib/i18n";
import { posts } from "@/lib/posts";

const postTags: Record<string, string> = {
  "the-goto-lesson": "CRAFT",
};

export default function LabPage() {
  const { lang } = useLanguage();
  const t = CONTENT[lang].lab;

  return (
    <main className="flex flex-1 flex-col">
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow={t.eyebrow} ghost={t.ghost} title={t.title} />

          <Reveal>
            <p className="body-lg" style={{ marginTop: 22, maxWidth: "52ch" }}>
              {t.body}
            </p>
          </Reveal>

          <div className="lab-grid">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link href={localizeHref(`/lab/${post.slug}`, lang)} className="lab-item lab-item--link">
                  <span className="d">{post.date}</span>
                  <span className="ti">{post.title}</span>
                  <span className="tag">{postTags[post.slug] ?? "LAB"}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
