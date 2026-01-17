export default function SeoView({ seo }: any) {
  return (
    <section style={{ marginTop: 30 }}>
      <h2>SEO Metadata</h2>
      <p><b>Title:</b> {seo.title}</p>
      <p><b>Description:</b> {seo.description}</p>
      <p><b>Keywords:</b> {seo.keywords?.join(", ")}</p>
    </section>
  );
}
