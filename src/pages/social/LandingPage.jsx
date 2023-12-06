import "../../assets/css/plugin.css";
import "../../assets/css/Pages/landing_page.css";
import content11 from "../../assets/img/landing/content-1-1.png";
import content12 from "../../assets/img/landing/content-1-2.png";
import content13 from "../../assets/img/landing/content-1-3.png";
import { MainHeader } from "../../components/project/landing/MainHeader";

export const LandingPage = () => {
  return (
    <>
      <div
        className={"padding-body"}
        style={{
          color: "var(--text-primary)",
        }}
      >
        <MainHeader />
        <Content1 />
      </div>
      <div className={"footer"}>
        <div className={"padding-body"}></div>
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
