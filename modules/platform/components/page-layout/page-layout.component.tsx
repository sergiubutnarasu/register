import { Layout } from "@solness/ui";
import React, { FunctionComponent, ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

const PageLayout: FunctionComponent<Props> = ({ children }) => (
  <div className="page-wrapper  w-full">
    <Layout>{children}</Layout>
  </div>
);

export default PageLayout;
