import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import SecurityIcon from '@material-ui/icons/Security';
import PollIcon from '@material-ui/icons/Poll';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Accueil
            </li>
            </Link>

            <Link to="/elevageList" className="link">
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Elevage
            </li>
            </Link>


            <li className="sidebarListItem">
              <RestaurantMenuIcon className="sidebarIcon" />
              Estimation
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Ressource Menu</h3>
          <ul className="sidebarList">
            <Link to="/nourritureList" className="link">
              <li className="sidebarListItem">
                <RestaurantMenuIcon className="sidebarIcon" />
                 Nourriture
              </li>
            </Link>
            <Link to="/vaccinList" className="link">
              <li className="sidebarListItem">
                <SecurityIcon className="sidebarIcon" />
                Vaccin
              </li>
            </Link>
            <li className="sidebarListItem">
              <PollIcon className="sidebarIcon" />
              Taux de mortalité
            </li>
            
          </ul>
        </div>
       {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
  */}

      </div>
    </div>
  );
}
