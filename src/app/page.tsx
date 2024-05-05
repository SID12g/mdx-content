import contents from "@/utils/getContents";
import { tags } from "@/utils/getTags";
import Link from "next/link";

export default function Home() {
  console.log(tags);
  return (
    <div>
      <div style={{ display: "flex" }}>
        {tags.map((tag, index) => (
          <div
            style={{
              padding: 10,
              border: "1px solid black",
              borderRadius: 30,
              marginRight: 20,
            }}
            key={index}
          >
            <Link href={`/tags/${tag.tag}`}>
              {tag.tag} ({tag.count})
            </Link>
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
      <div>
        {contents.map((content, index) => (
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
    </div>
  );
}
