import React, { useContext, useState } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Auth } from "../../../contexts/auth";
import PageContent from "../../components/PageContent/PageContent";
import { account, storage } from "../../../services/appwrite";
import { ID } from "appwrite";
import { FaPaintbrush } from "react-icons/fa6";
import Spinner from "../../../components/core/elements/Spinner";
import SectionSubtitle from "../../components/SectionSubtitle/SectionSubtitle";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import UserCard from "../../../components/core/elements/users/UserCard/UserCard";
import BannerEditor from "./BannerEditor/BannerEditor";
import("./Profile.css");

export default function Profile() {
  const { updateDataValue, dataDiff, updUserData, user } = useContext(Auth);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const res = await storage.createFile("profiles", ID.unique(), file);
      if (res) {
        updateDataValue(
          "avatar",
          `https://nyc.cloud.appwrite.io/v1/storage/buckets/profiles/files/${res.$id}/view?project=flamality&mode=admin`
        );
      }
      setUploading(false);
    }
  };
  const sendVerificationEmail = async () => {
    account.createVerification("https://flamality.com/account/verify-email");
  };
  return (
    <PageContent>
      <PageTitle>Customize Your Profile</PageTitle>
      <SectionTitle>Public Profile</SectionTitle>
      <SectionSubtitle>Profile Picture</SectionSubtitle>
      <div className='account-tab-profile-pfpwrapper'>
        <img src={updUserData["avatar"]} />
        <input
          type='file'
          accept='image/png, image/jpeg'
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading ? <Spinner /> : <FaPaintbrush />}
      </div>
      <SectionSubtitle>Username</SectionSubtitle>
      <input
        type='text'
        value={updUserData["username"]}
        onChange={(e) => {
          updateDataValue("username", e.target.value);
        }}
        disabled={true}
      />
      <SectionSubtitle>Display Name</SectionSubtitle>
      <input
        type='text'
        value={updUserData["display"] || ""}
        onChange={(e) => {
          updateDataValue("display", e.target.value);
        }}
      />
      <SectionSubtitle>About Me</SectionSubtitle>
      <textarea
        rows={5}
        value={updUserData["bio"] || ""}
        onChange={(e) => {
          updateDataValue("bio", e.target.value);
        }}
      />
      <SectionSubtitle>Email</SectionSubtitle>
      <div className='account-tab-profile-email'>
        <input type='email' value={user.email} disabled={true} />
        <p className='account-tab-profile-email-verification-status'>
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
      <SectionSubtitle>Banner</SectionSubtitle>
      <BannerEditor
        banner_gradient={updUserData["banner_gradient"]}
        onChange={(val) => updateDataValue("banner_gradient", val)}
      />
      <SectionTitle>Preview</SectionTitle>
      <UserCard user={updUserData} />
    </PageContent>
  );
}
