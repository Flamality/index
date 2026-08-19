import React from "react";
import {
  BodyLarge,
  BodyMedium,
  BodySmall,
} from "../../../../../components/core/elements/typography/Body";
import {
  HeaderLarge,
  HeaderMedium,
  HeaderSmall,
  HeaderTiny,
} from "../../../../../components/core/elements/typography/Header";
import {
  TitleLarge,
  TitleMedium,
  TitleSmall,
} from "../../../../../components/core/elements/typography/Title";

export default function Typography() {
  return (
    <div>
      <h2>Typography</h2>
      <BodySmall>Body Small Text</BodySmall>
      <BodyMedium>Body Medium Text</BodyMedium>
      <BodyLarge>Body Large Text</BodyLarge>
      <TitleSmall>Title Small Text</TitleSmall>
      <TitleMedium>Title Medium Text</TitleMedium>
      <TitleLarge>Title Large Text</TitleLarge>
      <HeaderTiny>Header Tiny Text</HeaderTiny>
      <HeaderSmall>Header Small Text</HeaderSmall>
      <HeaderMedium>Header Medium Text</HeaderMedium>
      <HeaderLarge>Header Large Text</HeaderLarge>

      <BodyMedium muted>Muted Body Medium Text</BodyMedium>
    </div>
  );
}
