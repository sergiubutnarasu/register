import React, { FunctionComponent } from "react";
import { PageLayout, RegisterTable } from "../../components";
import { StorageConsentBanner } from "@/modules/platform/components";
import { CompanyProvider } from "../../providers";

const HomePage: FunctionComponent = () => {
  return (
    <PageLayout>
      <CompanyProvider>
        <RegisterTable />
      </CompanyProvider>
      <StorageConsentBanner />
    </PageLayout>
  );
};

export default HomePage;
