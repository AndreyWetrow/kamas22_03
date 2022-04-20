import { useNavigate, useParams } from "react-router-dom";

export function getURLParams(Component) {
  return (props) => <Component {...props} URLId={useParams()} />;
}
