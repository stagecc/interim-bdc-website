import React, { Fragment } from "react";
import { useFence } from "../../hooks";
import { Button } from "../buttons";
import { Paragraph } from "../typography";
import { Link } from "../link";

export const Unauthed = () => {
  const { checkAccessUrl } = useFence();
  
  return (
    <Fragment>
      <Paragraph>
        Log in with your eRA Commons credentials to determine which
        datasets to which you currently have access.
      </Paragraph>
      <Paragraph>
        For additional guidance on how to check what data you have access
        to on BDC, refer to the{" "}
        <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/written-documentation/getting-started/data-access/check-my-access-to-data">
          Checking Access page
        </Link>
        {" "}of the{" "}
        <Link to="https://bdcatalyst.gitbook.io/biodata-catalyst-documentation/">
          BDC documentation
        </Link>.
      </Paragraph>

      <Paragraph center style={{ margin: "2rem" }}>
        <Button as="a" href={checkAccessUrl}>Check My Access</Button>
      </Paragraph>
    </Fragment>
  )
}
