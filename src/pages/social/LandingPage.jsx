import "../../assets/css/plugin.css";
import "../../assets/css/Pages/landing_page.css";
import content11 from "../../assets/img/landing/content-1-1.png";
import content12 from "../../assets/img/landing/content-1-2.png";
import content13 from "../../assets/img/landing/content-1-3.png";
import { MainHeader } from "../../components/project/landing/MainHeader";
import { useEffect } from "react";
import deliLogoNoBG from "../../assets/img/delivery_logo-nobg.png";
import { EnvelopeSimple, MapPin, Phone, Tray } from "phosphor-react";

export const LandingPage = () => {
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <>
      <div
        className={"padding-body-2"}
        style={{
          color: "var(--text-primary)",
        }}
      >
        <MainHeader />
        <Content1 />
      </div>
      <div className={"footer"}>
        <div className={"padding-body-2"}>
          <div
            className={"row d-flex justify-content-between"}
            style={{
              alignItems: "center",
            }}
          >
            <div
              className={"main-logo row col-4"}
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
                    color: "var(--text-white)",
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
              className={"col-4 footer-info"}
              style={{
                color: "var(--text-white)",
              }}
            >
              <div
                style={{
                  fontWeight: "800",
                  fontSize: "20px",
                }}
              >
                Huflit Delivery Company
              </div>
              <div>
                <MapPin size={18} color="#ffffff" weight="fill" /> 828 Sư Vạn
                Hạnh, Phường 13, Quận 10, TP. HCM
              </div>
              <div>
                <Phone size={18} color="#ffffff" weight="fill" /> (028) 3863
                2052 - (028) 3862 9232
              </div>
              <div>
                <Tray size={18} color="#ffffff" weight="fill" /> (028) 3865 0991
              </div>
              <div>
                <EnvelopeSimple size={18} color="#ffffff" weight="fill" />{" "}
                contact@huflit.edu.vn
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Content1 = () => {
  return (
    <div className={"content content-1"}>
      <div className={"title"}>Delivering faster than GHN</div>
      <div
        className={"row"}
        style={{
          height: "60vh",
          overflow: "hidden",
        }}
      >
        <div className={"col-4"}>
          <img src={content11} alt={""} className={"content-img"} />
          <div>Exists in over the ... country</div>
        </div>
        <div className={"col-4"}>
          <img src={content12} alt={""} className={"content-img"} />
          <div>Our shippers are familiar with complex roads</div>
        </div>
        <div className={"col-4"}>
          <img src={content13} alt={""} className={"content-img"} />
          <div>And of course ... just only in our country</div>
        </div>
      </div>
    </div>
  );
};
