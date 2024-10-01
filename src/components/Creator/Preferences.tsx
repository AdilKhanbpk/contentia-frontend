
import React from "react";
import ContentCreatorPreferences from "./SubCreatorComp/ContentCreatorPreferences";
import SocialMediaInformation from "./SubCreatorComp/SocialMediaInformation";
import ApplicationSubmit from "./SubCreatorComp/ApplicationSubmit";

const Preferences: React.FC = () => {

  return (
    <div>
      <div>
      <ContentCreatorPreferences/>
    </div>
    <div className="mt-28">
      <SocialMediaInformation/>
    </div>
    <div className="mt-28">
      <ApplicationSubmit/>
    </div>
    </div>
  );
};

export default Preferences;
