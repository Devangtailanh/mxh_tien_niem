type Props = {
  mutualFriends: any;
};

const MutualFriends = ({ mutualFriends }: Props) => {
  return (
    <div className="flex  items-center gap-3">
      <div className="flex items-center -space-x-3">
        {mutualFriends?.slice(0, 5)?.map((mutualFriend: any) => (
          <img
            src={mutualFriend?.avatar || "/person.jpg"}
            className="size-6 rounded-full object-cover"
            alt="user"
            key={mutualFriend?.id}
            onClick={() =>
              (window.location.href = `/profile/${mutualFriend?.id}`)
            }
          />
        ))}
      </div>
      <span className="text-[12px]">
        {mutualFriends?.length || 0} bạn chung
      </span>
    </div>
  );
};

export default MutualFriends;
