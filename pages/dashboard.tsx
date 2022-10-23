import { NextPage } from "next";
import PageNavigation from "../components/PageNavigation";
import Map from "../components/Map";


const dashboard: NextPage = () => {

  return(
    <div className="dashboardContainer">
      <PageNavigation />
      <div className="dashboardContentContainer">
        <div className="dashboardContent">
          <Map />
        </div>
        <div className="dashboardContent">
          <div className="card"></div>
          <div className="card"></div>
        </div>
      </div>
    </div>
  )
}

export default dashboard