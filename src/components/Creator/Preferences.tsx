
import React from "react";
import ContentCreatorPreferences from "./ContentCreatorPreferences";
import SocialMediaInformation from "./SocialMediaInformation";
import ApplicationSubmit from "./ApplicationSubmit";

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
