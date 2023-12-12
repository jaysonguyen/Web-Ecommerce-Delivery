import deliLogoNoBG from "../../../assets/img/delivery_logo-nobg.png";
import bannerImg from "../../../assets/img/banner-img.png";
import "../../../assets/css/Pages/landing_page.css";

import { Slide } from "react-slideshow-image";
import { useNavigate } from "react-router-dom";
import { House, Info, SignIn } from "phosphor-react";
import { URL_SEARCH_ORDER_PAGE } from "../../../utils/constraint";

export const MainHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={"main-header row"}>
      <div className={"left-menu col-4"}>
        <div
          className={"main-logo row"}
          style={{
            height: "30vh",
            overflow: "hidden",
            alignItems: "center",
          }}
        >
          <div
            className={"col-6 "}
            style={{
              height: "100%",
            }}
          >
            <img
              src={deliLogoNoBG}
              alt={""}
              style={{
                height: "100%",
              }}
            />
          </div>
          <div className={"col logo-title"}>
            <div
              style={{
                color: "var(--primary-1)",
              }}
            >
              Huflit
            </div>
            <div
              style={{
                color: "var(--primary-2)",
              }}
            >
              Delivery
            </div>
          </div>
        </div>
        <div
          className={"menu"}
          style={{
            paddingLeft: "4em",
          }}
        >
          <div
            onClick={() => {
              navigate("/login");
            }}
          >
            <SignIn size={18} weight="fill" />
            <span>Login</span>
          </div>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <House size={18} weight="fill" />
            <span>Home</span>
          </div>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <Info size={18} weight="fill" />
            <span>About</span>
          </div>
        </div>
      </div>
      <div className={"right-pane col "}>
        <div className={"banner-wrapper ps-5"}>
          <div className={"row"}>
            <div className={"col-5 slogan"}>
              <div>You Trust,</div> <div>We Deliver.</div>
            </div>
            <div className={"col"}>
              <ul>
                <li className={"slogan"}>Fast Guys</li>
                <li className={"slogan"}>Flexible</li>
                <li className={"slogan"}>Carefulness</li>
              </ul>
            </div>
          </div>
          <div className={"row "}>
            <div className={"col-5"}>
              <div
                className={"banner-img"}
                style={{
                  marginLeft: "20px",
                  marginTop: "15px",
                  height: "30vh",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={bannerImg}
                  alt={""}
                  style={{
                    height: "100%",
                    zIndex: "50",
                    margin: "20px",
                    position: "absolute",
                  }}
                />
                <div className={"bg-banner"}></div>
              </div>
            </div>
            <div className={"col menu"}>
              <div
                onClick={() => {
                  navigate(URL_SEARCH_ORDER_PAGE);
                }}
              >
                <span>Search Order</span>
              </div>
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <span>Contact</span>
              </div>
              <div
                onClick={() => {
                  navigate("/");
                }}
              >
                <span>Report</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Slideshow = () => {
  const fadeImages = [
    {
      url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "First Slide",
    },
    {
      url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
      caption: "Second Slide",
    },
    {
      url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
      caption: "Third Slide",
    },
  ];

  const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };

  return (
    <div className="slide-container">
      <Slide>
        {fadeImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            >
              <span style={spanStyle}>{slideImage.caption}</span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};
