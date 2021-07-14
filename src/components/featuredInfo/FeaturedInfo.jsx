import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Elevage en cours</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2</span>
        </div>
        <span className="featuredSub">NaN</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Evenements recent</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2</span>
        </div>
        <span className="featuredSub">NaN</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Evenements en approche</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2</span>
        </div>
        <span className="featuredSub">NaN</span>
      </div>
    </div>
  );
}
