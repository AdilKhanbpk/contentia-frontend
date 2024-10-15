import React from "react";
import ContentCreatorPreferences from "./SubCreatorComp/ContentCreatorPreferences";
import SocialMediaInformation from "./SubCreatorComp/SocialMediaInformation";

const Preferences: React.FC = () => {
  return (
    <div>
      <div>
        <ContentCreatorPreferences />
      </div>
      <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
        <SocialMediaInformation />
      </div>
    </div>
  );
};

export default Preferences;
