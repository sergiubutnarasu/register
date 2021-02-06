import { Button } from "@solness/ui";
import { signIn, useSession } from "next-auth/client";
import React, { FunctionComponent } from "react";
import { useCompanyContext } from "../../contexts";
import CompanyFormButton from "../company-form-button";
import DownloadButton from "../download-button";
import RegisterFormButton from "../register-form-button";

const RegisterTableActions: FunctionComponent = () => {
  const { company } = useCompanyContext();
  const [session, loading] = useSession();

  if (loading) {
    return null; // TODO: replace with loading
  }

  if (!session) {
    return (
      <Button size="small" onClick={() => signIn("google")}>
        Login in
      </Button>
    );
  }

  return (
    <>
      <CompanyFormButton />

      <div className="ml-1 sm:ml-2">
        <RegisterFormButton icon="plus" />
      </div>

      {Boolean(company.registers?.length) && (
        <div className="ml-1 sm:ml-2">
          <DownloadButton company={company} />
        </div>
      )}
    </>
  );
};

export default RegisterTableActions;
