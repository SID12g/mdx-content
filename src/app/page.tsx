import contents from "@/utils/getContents";
import { tags } from "@/utils/getTags";

export default function Home() {
  console.log(tags);
  console.log(contents);
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
            {tag.tag} ({tag.count})
          </div>
        ))}
      </div>
      <div style={{ height: 20 }} />
      <div>
        {contents.map((content, index) => (
          <div style={{ border: "1px solid black", padding: 8 }} key={index}>
            {content.meta.title} ({content.meta.tag}) ({content.meta.date})
          </div>
        ))}
      </div>
    </div>
  );
}
