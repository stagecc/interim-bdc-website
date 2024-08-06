import React from "react";
import { useFence } from "../../hooks";
import { LoadingDots } from "../loading";
import { Card, CardHeader, CardBody } from "../card";
import { Authed } from './authed';
import { Unauthed } from './unauthed';

export const DataAccessChecker = () => {
  const { user, projects, isLoading } = useFence();

  if (isLoading) {
    return <LoadingDots />
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
