import React, { useContext, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Auth } from "../../../../contexts/auth";
import PageContent from "../../components/PageContent/PageContent";
import { account, storage } from "../../../../services/appwrite";
import { ID } from "appwrite";
import {
  FaPaintbrush,
  FaStarHalf,
  FaStar,
  FaClock,
  FaXmark,
} from "react-icons/fa6";
import Spinner from "../../../../components/core/elements/Spinner";
import SectionSubtitle from "../../components/SectionSubtitle/SectionSubtitle";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import UserCard from "../../../../components/core/elements/users/UserCard/UserCard";
import BannerEditor from "./BannerEditor/BannerEditor";
import Button from "../../../../components/core/elements/inputs/buttons/Button/Button";
import Checkbox from "../../../../components/core/elements/inputs/checkbox/Checkbox";
import SettingGroup from "../../components/SettingGroup/SettingGroup";
import TabGroup from "../../../../components/core/elements/inputs/tabs/TabGroup/TabGroup";
import Tab from "../../../../components/core/elements/inputs/tabs/Tab/Tab";
import ButtonGroup from "../../../../components/core/elements/inputs/buttons/ButtonGroup/ButtonGroup";
import("./Profile.css");
import timezones from "../../../../services/timezones.json";
import {
  DropDown,
  DropDownItem,
} from "../../../../components/core/elements/inputs/dropdown/DropDown";
import UserSmallCard from "../../../../components/core/elements/users/UserSmallCard/UserSmallCard";
import RichTextField from "../../../../components/core/elements/inputs/RichTextField";
import TextField from "../../../../components/core/elements/inputs/TextField";

const statusOptions = ["online", "idle", "dnd", "offline"];

export default function Profile() {
  const { updateDataValue, dataDiff, updUserData, user } = useContext(Auth);
  const [uploading, setUploading] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const res = await storage.createFile("profiles", ID.unique(), file);
      if (res) {
        updateDataValue(
          "avatar",
          `https://nyc.cloud.appwrite.io/v1/storage/buckets/profiles/files/${res.$id}/view?project=flamality&mode=admin`,
        );
      }
      setUploading(false);
    }
  };
  const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadingBanner(true);
      const res = await storage.createFile("profiles", ID.unique(), file);
      if (res) {
        updateDataValue(
          "banner",
          `https://nyc.cloud.appwrite.io/v1/storage/buckets/profiles/files/${res.$id}/view?project=flamality&mode=admin`,
        );
      }
      setUploadingBanner(false);
    }
  };
  const sendVerificationEmail = async () => {
    account.createVerification("https://flamality.com/account/verify-email");
  };

  const changeStatus = (index) => {
    updateDataValue("status", statusOptions[index]);
  };
  return (
    <PageContent>
      <div className="account-tab-profile">
        <div>
          <SectionTitle>Public Profile</SectionTitle>
          <SettingGroup>
            <SectionSubtitle>Profile Picture</SectionSubtitle>
            <div className="account-tab-profile-pfpwrapper">
              <img src={updUserData["avatar"]} />
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleUpload}
                disabled={uploading}
              />
              {uploading ? <Spinner /> : <FaPaintbrush />}
            </div>
          </SettingGroup>
          <SettingGroup>
            <SectionSubtitle>Username</SectionSubtitle>
            <TextField
              type="text"
              value={updUserData["username"]}
              onChange={(e) => {
                updateDataValue("username", e.target.value);
              }}
              fullLength
              disabled={true}
            />
          </SettingGroup>
          <SettingGroup>
            <SectionSubtitle>Display Name</SectionSubtitle>
            <TextField
              type="text"
              fullLength
              value={updUserData["display"] || ""}
              onChange={(e) => {
                updateDataValue("display", e.target.value);
              }}
            />
          </SettingGroup>

          <SettingGroup>
            <SectionSubtitle>About Me</SectionSubtitle>
            <RichTextField
              mode="edit"
              textVisibility="hover"
              autoGrow
              value={updUserData["bio"] || ""}
              onChange={(e) => {
                updateDataValue("bio", e.target.value);
              }}
              fullLength
            />
          </SettingGroup>
          <SettingGroup>
            <SectionSubtitle>Status</SectionSubtitle>
            <TabGroup
              value={statusOptions.indexOf(updUserData["status"])}
              onChange={(index) => changeStatus(index)}
            >
              <Tab index={0}>Online</Tab>
              <Tab index={1}>Idle</Tab>
              <Tab index={2}>DND</Tab>
              <Tab index={3}>Offline</Tab>
            </TabGroup>
          </SettingGroup>
          <SettingGroup>
            <SectionSubtitle>Email</SectionSubtitle>
            <div className="account-tab-profile-email">
              <input type="email" value={user.email} disabled={true} />
              <p className="account-tab-profile-email-verification-status">
                {user.emailVerification ? (
                  "Email Verified"
                ) : (
                  <>
                    'Email Not Verified'{" "}
                    <a onClick={sendVerificationEmail}>Resent email</a>
                  </>
                )}
              </p>
            </div>
          </SettingGroup>
          <SettingGroup>
            <SectionSubtitle>Timezone</SectionSubtitle>
            <ButtonGroup>
              <TimezoneDropdown />
            </ButtonGroup>
          </SettingGroup>
          <SettingGroup>
            <SectionSubtitle>Banner</SectionSubtitle>
            <div className="account-tab-profile-bannerwrapper">
              <img src={updUserData["banner"]} />
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleBannerUpload}
                disabled={uploadingBanner}
              />
              {uploadingBanner ? <Spinner /> : <FaPaintbrush />}
            </div>
            <Button
              onClick={() => updateDataValue("banner", null)}
              leading={<FaXmark />}
            >
              Remove Banner
            </Button>
          </SettingGroup>
          <SettingGroup>
            <SectionSubtitle>Card Decor</SectionSubtitle>
            <DropDown
              selected={updUserData["sc_decor"]}
              onSelect={(val) => updateDataValue("sc_decor", val)}
              title="Show off your style!"
              position="bottom"
            >
              <DropDownItem value={null}>
                <div>
                  <SectionSubtitle>None</SectionSubtitle>
                  <UserSmallCard
                    disableClick
                    overwrite={{ ...updUserData, sc_decor: null }}
                  />
                </div>
              </DropDownItem>
              <DropDownItem value="stars">
                <div>
                  <SectionSubtitle>Stars</SectionSubtitle>
                  <UserSmallCard
                    disableClick
                    overwrite={{ ...updUserData, sc_decor: "stars" }}
                  />
                </div>
              </DropDownItem>
              <DropDownItem value="love">
                <div>
                  <SectionSubtitle>Love</SectionSubtitle>
                  <UserSmallCard
                    disableClick
                    overwrite={{ ...updUserData, sc_decor: "love" }}
                  />
                </div>
              </DropDownItem>
              <DropDownItem value="hexagon">
                <div>
                  <SectionSubtitle>Hexagon</SectionSubtitle>
                  <UserSmallCard
                    disableClick
                    overwrite={{ ...updUserData, sc_decor: "hexagon" }}
                  />
                </div>
              </DropDownItem>
              <DropDownItem value="pentagram">
                <div>
                  <SectionSubtitle>Pentagram</SectionSubtitle>
                  <UserSmallCard
                    disableClick
                    overwrite={{ ...updUserData, sc_decor: "pentagram" }}
                  />
                </div>
              </DropDownItem>
            </DropDown>
          </SettingGroup>
          <SettingGroup>
            <SectionSubtitle>Accent Color</SectionSubtitle>
            <BannerEditor
              banner_gradient={updUserData["banner_gradient"]}
              onChange={(val) => updateDataValue("banner_gradient", val)}
              style={updUserData["gradient_style"]}
            />
            <SectionSubtitle>Accent Color Style</SectionSubtitle>
            <ButtonGroup>
              <Button
                onClick={() => updateDataValue("gradient_style", "gradient")}
                disabled={updUserData["gradient_style"] === "gradient"}
                leading={<FaStar />}
              >
                Gradient
              </Button>
              <Button
                onClick={() => updateDataValue("gradient_style", "block")}
                disabled={updUserData["gradient_style"] === "block"}
                leading={<FaStarHalf />}
              >
                Block
              </Button>
            </ButtonGroup>
          </SettingGroup>
        </div>
        <div>
          <SectionTitle>Preview</SectionTitle>
          <SettingGroup>
            <UserCard overwrite={updUserData}></UserCard>
          </SettingGroup>
        </div>
      </div>
    </PageContent>
  );
}

function TimezoneDropdown() {
  const { updateDataValue, dataDiff, updUserData } = useContext(Auth);
  return (
    <>
      <DropDown
        disabled={timezones.length === 0 || !updUserData["timezone"]}
        selected={updUserData["timezone"]}
        onSelect={(val) => updateDataValue("timezone", val)}
        title="Show off your local time!"
      >
        {timezones.map((tz) => (
          <DropDownItem value={tz.timezone}>
            <p>
              {tz.name} (
              {new Date().toLocaleTimeString("en-US", {
                timeZone: tz.timezone,
                hour: "2-digit",
                minute: "2-digit",
              })}
              )
            </p>
          </DropDownItem>
        ))}
      </DropDown>

      <Button
        onClick={() =>
          updateDataValue(
            "timezone",
            Intl.DateTimeFormat().resolvedOptions().timeZone ||
              "America/New_York",
          )
        }
        disabled={
          updUserData["timezone"] ===
          Intl.DateTimeFormat().resolvedOptions().timeZone
        }
        leading={<FaClock />}
      >
        Set to Local Timezone
      </Button>
    </>
  );
}
