import { Link } from "react-router-dom";
import branchImg from "../../../assets/img/dashboard/list.png";
import cityImg from "../../../assets/img/dashboard/win.png";
import voucherImg from "../../../assets/img/dashboard/schedule.png";
import productTypeImg from "../../../assets/img/dashboard/clip.png";
import {
  URL_BRANCH,
  URL_CITY,
  URL_PRODUCTTYPE,
  URL_VOUCHER,
} from "../../../utils/constraint";
export default function SettingOptionTwo() {
  return (
    <>
      <div className="row">
        <div className="col">
          <Link to={URL_BRANCH}>
            <div className="option-card">
              <div className="option-title">Branch</div>
              <div className="option-icon">
                <img className="option-img" src={branchImg} alt="" />
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to={URL_CITY}>
            <div className="option-card">
              <div className="option-title">City</div>
              <div className="option-icon">
                <img className="option-img" src={cityImg} alt="" />
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to={URL_VOUCHER}>
            <div className="option-card">
              <div className="option-title">Voucher</div>
              <div className="option-icon">
                <img className="option-img" src={voucherImg} alt="" />
              </div>
            </div>
          </Link>
        </div>
        <div className="col">
          <Link to={URL_PRODUCTTYPE}>
            <div className="option-card">
              <div className="option-title">Product Type</div>
              <div className="option-icon">
                <img className="option-img" src={productTypeImg} alt="" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
