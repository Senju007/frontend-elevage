import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./elevage.css";

export default function Elevage() {
  return (
    <div className="elevage">
      <div className="elevageTitleContainer">
        <h1 className="elevageTitle">Edit Elevage</h1>
        <Link to="/newUser">
          <button className="elevageAddButton">Create</button>
        </Link>
      </div>
      <div className="elevageContainer">
        <div className="elevageShow">
          <div className="elevageShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="elevageShowImg"
            />
            <div className="elevageShowTopTitle">
              <span className="elevageShowUsername">Elevage</span>
            </div>
          </div>
          <div className="elevageShowBottom">
            <span className="elevageShowTitle">Details</span>
            <div className="elevageShowInfo">
              <PermIdentity className="elevageShowIcon" />
              <span className="elevageShowInfoTitle">annabeck99</span>
            </div>
            <div className="elevageShowInfo">
              <CalendarToday className="elevageShowIcon" />
              <span className="elevageShowInfoTitle">10.12.1999</span>
            </div>
            <span className="elevageShowTitle">Contact Details</span>
            <div className="elevageShowInfo">
              <PhoneAndroid className="elevageShowIcon" />
              <span className="elevageShowInfoTitle">+1 123 456 67</span>
            </div>
            <div className="elevageShowInfo">
              <MailOutline className="elevageShowIcon" />
              <span className="elevageShowInfoTitle">annabeck99@gmail.com</span>
            </div>
            <div className="elevageShowInfo">
              <LocationSearching className="elevageShowIcon" />
              <span className="elevageShowInfoTitle">New York | USA</span>
            </div>
          </div>
        </div>
        <div className="elevageUpdate">
          <span className="elevageUpdateTitle">Edit</span>
          <form className="elevageUpdateForm">
            <div className="elevageUpdateLeft">
              <div className="elevageUpdateItem">
                <label>Type</label>
                <input
                  type="text"
                  placeholder="..."
                  className="elevageUpdateInput"
                />
              </div>
              <div className="elevageUpdateItem">
                <label>Date debut</label>
                <input
                  type="text"
                  placeholder="..."
                  className="elevageUpdateInput"
                />
              </div>
              <div className="elevageUpdateItem">
                <label>Nombre de poulet</label>
                <input
                  type="text"
                  placeholder="..."
                  className="elevageUpdateInput"
                />
              </div>
              <div className="elevageUpdateItem">
                <label>etat</label>
                <input
                  type="text"
                  placeholder="..."
                  className="elevageUpdateInput"
                />
              </div>
            </div>
            <div className="elevageUpdateRight">
              <button className="elevageUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
