import { Layout } from "@solness/ui";
import React, { FunctionComponent, ReactNode } from "react";

export interface Props {
  children: ReactNode;
}

const PageLayout: FunctionComponent<Props> = ({ children }) => (
  <Layout>{children}</Layout>
);

export default PageLayout;
