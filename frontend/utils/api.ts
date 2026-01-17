const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

/**
 * LOGIN
 */
export async function login(username: string, password: string) {
  // ✅ trim to avoid `admin%20` bug
  const u = username.trim();
  const p = password.trim();

  const res = await fetch(
    `${API_BASE}/login?username=${encodeURIComponent(u)}&password=${encodeURIComponent(p)}`,
    {
      method: "POST",
    }
  );

  const text = await res.text();

  if (!res.ok) {
    console.error("LOGIN ERROR:", text);
    throw new Error(text || "Login failed");
  }

  return JSON.parse(text);
}

/**
 * GENERATE ARTICLE
 */
export async function generateArticle(
  token: string,
  query: string,
  url?: string
) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: query.trim(),
      url: url?.trim() || undefined,
    }),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("GENERATE ERROR:", text);
    throw new Error(text || "Generation failed");
  }

  return JSON.parse(text);
}
