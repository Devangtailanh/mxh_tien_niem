type Props = {
  title: any;
  style?: string;
};

const NoData = ({ title, style }: Props) => {
  return (
    <div className={`w-full flex flex-col items-center`}>
      <div className={`${style ? style : "w-[200px] h-[200px]"}`}>
        <img src="/empty-box.png" alt="nodata" className="w-full h-full" />
      </div>
      <p className="text-center">{title}</p>
    </div>
  );
};

export default NoData;
