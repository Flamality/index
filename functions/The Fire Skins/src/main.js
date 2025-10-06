export default async ({ req, res, log, error }) => {
  log("RAW BODY: " + req.body);

  const { query } = JSON.parse(req.body || "{}");
  const username = query?.username;
  const uid = query?.uid;

  if (!username && !uid) return res.send("Missing username or uid", 400);

  let finalUUID = uid;
  let finalName = username;

  try {
    // Get UUID if needed
    if (!uid && username) {
      const mojangRes = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
      if (!mojangRes.ok) return res.send("User not found", 404);
      const mojangJson = await mojangRes.json();
      finalUUID = mojangJson.id;
      finalName = mojangJson.name;
    }

    // Name history
    const nameHistoryRes = await fetch(`https://api.mojang.com/user/profiles/${finalUUID}/names`);
    const nameHistory = nameHistoryRes.ok ? await nameHistoryRes.json() : [];

    // Session textures
    const sessionRes = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${finalUUID}`);
    if (!sessionRes.ok) return res.send("Failed to fetch session data", 500);
    const sessionJson = await sessionRes.json();

    const texturesProperty = sessionJson.properties.find(p => p.name === "textures");
    let decodedTextures = {};
    let skinUrl = null;
    let capeUrl = null;
    if (texturesProperty) {
      const decoded = Buffer.from(texturesProperty.value, "base64").toString("utf-8");
      decodedTextures = JSON.parse(decoded);
      skinUrl = decodedTextures?.textures?.SKIN?.url || null;
      capeUrl = decodedTextures?.textures?.CAPE?.url || null;
    }

    // Crafatar previews
    const crafatarHead = `https://crafatar.com/avatars/${finalUUID}`;
    const crafatarBody = `https://crafatar.com/renders/body/${finalUUID}`;
    const crafatarSkin = `https://crafatar.com/skins/${finalUUID}`;
    const crafatarCape = `https://crafatar.com/capes/${finalUUID}`;

    return res.json({
      uuid: finalUUID,
      name: finalName,
      name_history: nameHistory,
      textures: decodedTextures,
      current_skin_url: skinUrl,
      current_cape_url: capeUrl,
      previews: {
        head: crafatarHead,
        body: crafatarBody,
        skin: crafatarSkin,
        cape_texture: capeUrl, 
        cape_2d_preview: capeUrl
      }
    });
  } catch (err) {
    log(err);
    return res.send("Internal error", 500);
  }
};
