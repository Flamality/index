import React from "react";
import "./Friends.css";
import Search from "./components/Search";
import PageContent from "../../components/PageContent/PageContent";
import PageTitle from "../../components/PageTitle/PageTitle";
import FriendsList from "./components/FriendsList/FriendsList";
export default function Friends() {
  return <PageContent>
    <PageTitle>Friends</PageTitle>
    <Search />
    <FriendsList />
  </PageContent>;
}
