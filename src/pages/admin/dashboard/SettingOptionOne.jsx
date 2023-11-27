import { Link } from "react-router-dom";
import customerImg from "../../../assets/img/dashboard/decision-making.png";
import staffImg from "../../../assets/img/dashboard/trust.png";
import shipperImg from "../../../assets/img/dashboard/motivation.png";
import {
  URL_CUSTOMER,
  URL_GET_SHIPPER,
  URL_STAFF,
} from "../../../utils/constraint";
export default function SettingOptionOne() {
  return (
    <>
      <div className="row">
        <div className="col">
          <Link to={URL_CUSTOMER}>
            <div className="option-card">
              <div className="option-title">Customer</div>
              <div className="option-icon">
                <img className="option-img" src={customerImg} alt="" />
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to={URL_STAFF}>
            <div className="option-card">
              <div className="option-title">Staff</div>
              <div className="option-icon">
                <img className="option-img" src={staffImg} alt="" />
              </div>
            </div>
          </Link>
          <Link to={URL_STAFF}>
            <div className="option-card">
              <div className="option-title">Shipper</div>
              <div className="option-icon">
                <img className="option-img" src={shipperImg} alt="" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
