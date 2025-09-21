import FriendSkeleton from "./FriendSkeleton";
type Props = {
  length: number;
  styles: string;
};
const FriendListSkeleton = ({ length, styles }: Props) => {
  return (
    <div className={`${styles}`}>
      {Array.from({ length }).map((_, i) => (
        <FriendSkeleton key={i} />
      ))}
    </div>
  );
};

export default FriendListSkeleton;
