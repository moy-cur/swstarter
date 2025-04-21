import { useParams } from "react-router";
import DetailPage from "@pages/Detail/Detail";

const DetailPageWrapper = () => {
  const { type, id } = useParams();

  return <DetailPage key={`${type}-${id}`} />;
};

export default DetailPageWrapper;
