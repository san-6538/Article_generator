export default function ArticleView({ article, html, downloadPath }: any) {
  async function handleDownload() {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:8000${downloadPath}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "article.html";
    a.click();
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
      <p className="mb-4">{article.intro}</p>

      <iframe
        srcDoc={html}
        className="w-full h-96 border rounded"
      />

      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download HTML
      </button>
    </div>
  );
}
