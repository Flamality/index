import React from "react";
import PageContent from "../../components/PageContent/PageContent";
import PageTitle from "../../components/PageTitle/PageTitle";
import CreateConnectionList from "./components/CreateConnectionList/CreateConnectionList";
import ConnectionList from "./components/ConnectionList/ConnectionList";

export default function Connections() {
  return (
    <PageContent>
      <PageTitle>Connections</PageTitle>
      <label>Add Connection</label>
      <CreateConnectionList />
      <label>My Connections</label>
      <ConnectionList />
    </PageContent>
  );
}
