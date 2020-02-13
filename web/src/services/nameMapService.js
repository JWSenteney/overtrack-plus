import _ from "lodash";

export const getFriendlyHeroName = hero => {
  const specialCases = {
    dva: "DVa",
    mccree: "McCree",
    s76: "Soldier_76",
    hammond: "Wrecking_Ball"
  };

  if (specialCases[hero]) {
    return specialCases[hero];
  } else {
    return _.chain(hero)
      .split(" ")
      .map(token => _.upperFirst(token))
      .join("_")
      .value();
  }
};

export const getFriendlyMapName = map => {
  return _.chain(map)
    .replace(/ /g, "_")
    .replace(/[:,']/g, "")
    .valueOf();
};
