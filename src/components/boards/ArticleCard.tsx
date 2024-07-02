import Image from "next/image";
import Link from "next/link";
import { ArticleType } from "@lib/types/articleType";
import heartIcon from "@icons/ic_heart.svg";

interface ArticleCardProps {
  items: ArticleType[];
}

const ArticleCard = ({ items }: ArticleCardProps) => {
  return (
    <div className="best_article flex gap-[15px]">
      {items?.map((article) => {
        const articleDate = article.createdAt.split("T")[0];
        return (
          <Link
            href={`/boards/${article.id}`}
            key={article.id}
            className="basis-1/4 overflow-hidden rounded-[10px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]"
          >
            <div className="relative h-[130px] w-full">
              {/* {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            ) : (
              <div>no image</div>
            )} */}
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-[15px_20px]">
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[18px] font-semibold">
                {article.title}
              </div>
              <div className="mt-[10px] flex items-center justify-between text-gray400">
                <div>
                  {article.writer.name}
                  <span className="ml-[5px]">{articleDate}</span>
                </div>
                <div className="flex items-center gap-[3px]">
                  <Image src={heartIcon} alt="좋아요" width={14} height={12} />
                  {article.likeCount}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ArticleCard;
