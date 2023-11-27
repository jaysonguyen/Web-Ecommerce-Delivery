import { Link } from "react-router-dom";
import customerImg from "../../../assets/img/dashboard/decision-making.png";
import staffImg from "../../../assets/img/dashboard/trust.png";
import shipperImg from "../../../assets/img/dashboard/motivation.png";
import { URL_SHIPPER_ASSIGNMENT_PAGE } from "../../../utils/constraint";
export default function ShipperOption() {
  return (
    <>
      <div className="row">
        <div className="col">
          <Link to={URL_SHIPPER_ASSIGNMENT_PAGE}>
            <div className="option-card">
              <div className="option-title">Order List</div>
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
