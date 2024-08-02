import React from "react";
import { useFence } from "../../hooks";
import { LoadingDots } from "../loading";
import { Card, CardHeader, CardBody } from "../card";
import { FenceProvider } from "../../hooks";
import { Authed } from './authed';
import { Unauthed } from './unauthed';

export const DataAccess = () => {
  const { user, projects, isLoading } = useFence();
  
  return (
    <FenceProvider>
      <Card>
        <CardHeader>My Access</CardHeader>
        <CardBody>{
          isLoading
            ? <LoadingDots />
            : (user && projects)
              ? <Authed />
              : <Unauthed />
        }</CardBody>
      </Card>
    </FenceProvider>
  );
};
