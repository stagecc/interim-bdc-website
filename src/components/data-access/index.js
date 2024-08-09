import React from "react";
import { useFence } from "../../hooks";
import { LoadingSpinner } from "../loading";
import { Card, CardHeader, CardBody } from "../card";
import { Authed } from './authed';
import { Unauthed } from './unauthed';

export const DataAccessChecker = () => {
  const { user, isLoading } = useFence();

  if (isLoading) {
    return <LoadingSpinner height="400px" />
  }

  if (!user) {
    return (
      <Unauthed />
    )
  }

  return (
    <Card>
      <CardHeader>My Access</CardHeader>
      <CardBody>
        <Authed />
      </CardBody>
    </Card>
  );
};
