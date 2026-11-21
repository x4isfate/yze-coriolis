export const getID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const getItemsByType = (itemType) => {
  return game.items.contents.filter((item) => {
    return item.type === itemType;
  });
};

export const getOwnedItemsByType = (actor, itemType) => {
  return actor.items.filter((item) => item.type === itemType);
};

export const getOwnedItemById = (actor, itemId) => {
  return actor.items.find((item) => item.id === itemId);
};

export const getActorEntitiesByType = (actorType) => {
  return game.actors.contents.filter((a) => {
    return a.type === actorType;
  });
};

/**
 * @param  {String} actorId
 * @returns the actor document object.
 */
export const getActorDataById = (actorId) => {
  if (!actorId) {
    return null;
  }
  const actor = game.actors.get(actorId);
  if (!actor) {
    console.warn("actor not found with ID: ", actorId);
    return null;
  }
  return actor;
};

/**
 * Returns the current chat visibility mode as a legacy roll mode string
 * (publicroll, gmroll, blindroll, selfroll), which the rest of the system uses.
 * Foundry v14 replaced the core.rollMode setting with core.messageMode.
 * @returns {string}
 */
export const getLegacyRollMode = () => {
  if (game.settings.settings.has("core.messageMode")) {
    const mode = game.settings.get("core", "messageMode");
    const legacyModes = {
      public: "publicroll",
      gm: "gmroll",
      blind: "blindroll",
      self: "selfroll",
      ic: "publicroll",
    };
    return legacyModes[mode] || "publicroll";
  }
  return game.settings.get("core", "rollMode");
};

export const hasOwnerPermissionLevel = (perm) => {
  const levels = CONST.DOCUMENT_PERMISSION_LEVELS || CONST.DOCUMENT_OWNERSHIP_LEVELS;
  return perm === levels?.OWNER;
};
