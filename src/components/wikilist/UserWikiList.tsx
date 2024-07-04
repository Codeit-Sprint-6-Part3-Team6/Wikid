import UserWikiCard from "./UserWikiCard";
import { Profile } from "@lib/types/Profile";

interface UserWikiListProps {
  items: Profile[];
}

const UserWikiList = ({ items }: UserWikiListProps) => {
  return (
    <div className="min-h-[468px]">
      {items?.map((profile) => (
        <UserWikiCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export default UserWikiList;
