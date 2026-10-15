// QuestsProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { Notifications } from "./notifications";
import { account } from "../services/appwrite";

export const Quests = createContext(null);

const defaultQuests = {
  visit: {
    title: "Welcome!",
    description: "Visit the website for the first time",
  },
  boop: {
    title: "Boop!",
    description: "Click on Mizu at the bottom of the page!",
  },
  copycat: {
    title: "Copycat",
    description: "Copy something from the website.",
  },
  error: {
    title: "Erm...",
    description: "Visit the 404 page.",
  },
};

export const QuestsProvider = ({ children }) => {
  const { createNotification } = useContext(Notifications);
  const [quests, setQuests] = useState(defaultQuests);
  const grantQuest = (quest) => {
    if (quests[quest]?.rewarded) {
      return;
    }
    createNotification(
      "quest",
      `${quests[quest]?.title}`,
      quests[quest]?.description,
    );
    setQuests((prevQuests) => ({
      ...prevQuests,
      [quest]: {
        ...prevQuests[quest],
        rewarded: true,
      },
    }));
    document.cookie = `quests=${JSON.stringify({ ...quests, [quest]: { ...quests[quest], rewarded: true } })}; path=/`;
  };

  useEffect(() => {
    const cookies = document.cookie;
    const questCookie = cookies
      .split("; ")
      .find((row) => row.startsWith("quests="));
    if (questCookie) {
      const questValue = questCookie.split("=")[1];
      const newQuests = { ...defaultQuests, ...JSON.parse(questValue) };
      setQuests(newQuests);
    }
  }, []);

  const syncToAccount = () => {
    account.get().then((response) => {
      console.log("Syncing quests to account:", quests);
    });
  };
  const syncFromAccount = () => {
    console.log("Syncing quests from account:", quests);
  };
  const logout = () => {
    setQuests(defaultQuests);
    document.cookie = `quests=${JSON.stringify(defaultQuests)}; path=/`;
  };
  return (
    <Quests.Provider
      value={{ grantQuest, syncToAccount, syncFromAccount, logout, quests }}
    >
      {children}
    </Quests.Provider>
  );
};
