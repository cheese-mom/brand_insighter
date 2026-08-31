import { getSiteContent } from "@/lib/content";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

// 어드민에서 입력된 텍스트가 그대로 들어가므로 </script> 탈출을 막기 위해 < 를 이스케이프
function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
    />
  );
}

// 사이트 전역 구조화 데이터: Organization + Person + WebSite (@graph)
// 검색엔진(리치 결과)과 AI 답변엔진(GEO)이 인물·기관 정보를 인용하는 근거가 된다.
export default async function JsonLd() {
  const { footer, hero } = await getSiteContent();
  const site = getSiteUrl().toString().replace(/\/$/, "");

  const sameAs = [footer.instagram, footer.youtube].filter((u) =>
    u?.startsWith("http"),
  );

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site}/#org`,
        name: footer.org,
        url: site,
        address: {
          "@type": "PostalAddress",
          streetAddress: footer.address,
          addressLocality: "서울",
          addressCountry: "KR",
        },
        telephone: footer.tel,
        email: footer.email,
      },
      {
        "@type": "Person",
        "@id": `${site}/#person`,
        name: footer.ceo,
        jobTitle: "브랜드 네이밍 전문가",
        description: hero.subtitle,
        url: site,
        worksFor: { "@id": `${site}/#org` },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        name: SITE_NAME,
        url: site,
        inLanguage: "ko",
        publisher: { "@id": `${site}/#org` },
      },
    ],
  };

  return <JsonLdScript data={graph} />;
}

// 페이지별 빵부스러기 구조화 데이터 (홈 → 페이지명 [→ 글제목])
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const site = getSiteUrl().toString().replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map(
      (item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${site}${item.path}`,
      }),
    ),
  };

  return <JsonLdScript data={data} />;
}

// Activity 상세 페이지용 Article 구조화 데이터
export function ArticleJsonLd({
  title,
  excerpt,
  path,
  datePublished,
  image,
}: {
  title: string;
  excerpt: string;
  path: string;
  datePublished?: string;
  image?: string | null;
}) {
  const site = getSiteUrl().toString().replace(/\/$/, "");
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    url: `${site}${path}`,
    inLanguage: "ko",
    ...(datePublished ? { datePublished } : {}),
    ...(image ? { image } : {}),
    author: { "@id": `${site}/#person` },
    publisher: { "@id": `${site}/#org` },
  };

  return <JsonLdScript data={data} />;
}
