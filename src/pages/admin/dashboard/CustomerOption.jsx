import { Link } from "react-router-dom";
import customerImg from "../../../assets/img/dashboard/decision-making.png";
import { URL_CUSTOMER_STORE } from "../../../utils/constraint";
export default function CustomerOption() {
  return (
    <>
      <div className="row">
        <div className="col">
          <Link to={URL_CUSTOMER_STORE}>
            <div className="option-card">
              <div className="option-title">Store</div>
              <div className="option-icon">
                <img className="option-img" src={customerImg} alt="" />
              </div>
            </div>
          </Link>
        </div>
        <div className="col"></div>
      </div>
    </>
  );
}
