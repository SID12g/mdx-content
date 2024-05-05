import contents from "@/utils/getContents";
import Link from "next/link";
import { unescape } from "querystring";

export default function Tags({ params }: { params: { slug: string } }) {
  const filterContents = contents.filter(
    (content) => content.meta.tag == unescape(params.slug)
  );
  console.log(filterContents);
  return (
    <div>
      <div>{unescape(params.slug)}</div>
      {filterContents.map((content, index) => (
        <div
          style={{ border: "1px solid black", margin: 8, padding: 8 }}
          key={index}
        >
          <Link href={`/contents/${content.slug}`}>
            {content.meta.title} ({content.meta.tag}) ({content.meta.date})
          </Link>
        </div>
      ))}
    </div>
    // unescape는 url에서 param인 테그를 가져올 때 한글이라면 깨짐 방지
  );
}
