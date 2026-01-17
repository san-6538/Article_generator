import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { generateArticle } from "@/utils/api";
import { getToken, logout } from "@/utils/auth";
import ArticleView from "@/components/ArticleView";
import SeoView from "@/components/SeoView";

export default function GeneratePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getToken()) router.replace("/login");
  }, [router]);

  async function handleGenerate() {
    const token = getToken();
    if (!token || !query.trim()) return;

    setLoading(true);
    try {
      const res = await generateArticle(token, query, url);
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('5382404.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* STRICT WIDTH CONTAINER */}
      <div className="relative z-10 w-[420px]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-cyan-300">
            Generate Article
          </h1>

          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="
              text-xs px-3 py-1.5 rounded
              bg-black/60 text-white
              border border-cyan-400/40
              hover:bg-black/80
              transition
            "
          >
            Logout
          </button>
        </div>

        {/* Glass Card */}
        <div
          className="
            bg-black/75 backdrop-blur-xl
            border border-cyan-400/30
            rounded-2xl
            shadow-[0_0_35px_rgba(0,255,255,0.35)]
            p-6 space-y-4
          "
        >
          <input
            className="
              w-full px-4 py-3 rounded-lg
              bg-black/80 text-white
              border border-cyan-300/30
              placeholder-gray-400
              focus:outline-none focus:border-cyan-400
            "
            placeholder="Article topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <input
            className="
              w-full px-4 py-3 rounded-lg
              bg-black/80 text-white
              border border-pink-300/30
              placeholder-gray-400
              focus:outline-none focus:border-pink-400
            "
            placeholder="Optional source URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="
              w-full py-3 rounded-lg font-semibold
              bg-gradient-to-r from-cyan-400 to-pink-500
              text-black
              hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]
              hover:scale-[1.02]
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Output */}
        {data && (
          <div className="mt-10 space-y-8">
            <SeoView seo={data.seo} />
            <ArticleView
              article={data.article_json}
              html={data.html_string}
              downloadPath={data.download_path}
            />
          </div>
        )}
      </div>
    </div>
  );
}
