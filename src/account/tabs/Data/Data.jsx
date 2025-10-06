import React, { useContext } from "react";
import { Auth } from "../../../contexts/auth";
import RichText from "../../../components/core/elements/inputs/RichText";
import("./Data.css");

export default function Data() {
  const { userData, user, updUserData, dataDiff, loading, connections } =
    useContext(Auth);

  return (
    <div className='account-tab-data account-tab'>
      <RichText />
      <p className='account-tab-data-header'>User</p>
      <pre className='account-tab-data-code'>
        {JSON.stringify(user, null, 2)}
      </pre>

      <p className='account-tab-data-header'>UserData</p>
      <pre className='account-tab-data-code'>
        {JSON.stringify(userData, null, 2)}
      </pre>

      <p className='account-tab-data-header'>Loading</p>
      <pre className='account-tab-data-code'>
        {JSON.stringify(loading, null, 2)}
      </pre>

      <p className='account-tab-data-header'>dataDiff</p>
      <pre className='account-tab-data-code'>
        {JSON.stringify(dataDiff, null, 2)}
      </pre>

      <p className='account-tab-data-header'>updUserData</p>
      <pre className='account-tab-data-code'>
        {JSON.stringify(updUserData, null, 2)}
      </pre>

      <p className='account-tab-data-header'>connections</p>
      <pre className='account-tab-data-code'>
        {JSON.stringify(connections, null, 2)}
      </pre>
    </div>
  );
}
