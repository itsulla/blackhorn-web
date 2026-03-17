const fs = require('fs');
const path = require('path');

function loadEnv(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) return env;
  const content = fs.readFileSync(filePath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    env[key] = value;
  }
  return env;
}

const env = {
  ...loadEnv(path.join(process.cwd(), '.env.local')),
  ...process.env,
};

Object.assign(process.env, env);

const {createClient} = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const hasCjk = (s) => /[\u3400-\u9FFF\uF900-\uFAFF]/.test(s || '');

async function main() {
  const posts = await client.fetch(
    `*[_type == "blogPost"] | order(publishDate desc){
      _id,
      title,
      title_zh,
      "slug": slug.current,
      publishDate
    }`
  );

  console.log(`Total Sanity blog posts: ${posts.length}\n`);
  for (const post of posts) {
    const flags = [
      post.title_zh ? 'has_zh' : 'no_zh',
      hasCjk(post.title) || hasCjk(post.slug) ? 'cjk_in_primary' : 'primary_en',
    ].join(', ');
    console.log(`${post.publishDate} | ${post.slug} | ${post.title} | ${flags}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
