import NoData from "./NoData";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Developing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex  flex-col items-center gap-5">
      <NoData title="Tính năng đang trong quá trình phát triển!!!!" />
      <Button className="max-w-max capitalize" onClick={() => navigate("/")}>
        Quay lại
      </Button>
    </div>
  );
};

export default Developing;
