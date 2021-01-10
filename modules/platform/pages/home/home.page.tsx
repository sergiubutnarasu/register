import React, { FunctionComponent } from "react";
import { PageLayout, RegisterTable } from "../../components";
import { CompanyProvider } from "../../providers";

const HomePage: FunctionComponent = () => {
  return (
    <PageLayout>
      <CompanyProvider>
        <RegisterTable />
      </CompanyProvider>
    </PageLayout>
  );
};

export default HomePage;
