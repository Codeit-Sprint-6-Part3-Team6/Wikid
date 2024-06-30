import UserWikiCard from "./UserWikiCard";
import { Profile } from "@lib/types/Profile";

interface UserWikiListProps {
  items: Profile[];
}

const UserWikiList = ({ items }: UserWikiListProps) => {
  return (
    <div className="wikiList">
      {items?.map((profile) => (
        <UserWikiCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default UserWikiList;
