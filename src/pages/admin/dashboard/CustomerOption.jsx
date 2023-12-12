import { Link } from "react-router-dom";
import storeImg from "../../../assets/img/dashboard/binder.png";
import accountImg from "../../../assets/img/dashboard/archives.png";
import {
  URL_CUSTOMER_BANK_ACCOUNT,
  URL_CUSTOMER_STORE,
} from "../../../utils/constraint";
export default function CustomerOption() {
  return (
    <>
      <div className="row">
        <div className="col">
          <Link to={URL_CUSTOMER_STORE}>
            <div className="option-card">
              <div className="option-title">Store</div>
              <div className="option-icon">
                <img className="option-img" src={storeImg} alt="" />
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to={URL_CUSTOMER_BANK_ACCOUNT}>
            <div className="option-card">
              <div className="option-title">Bank Account</div>
              <div className="option-icon">
                <img className="option-img" src={accountImg} alt="" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
