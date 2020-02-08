import _ from "lodash";

import { getFriendlyHeroName } from "./nameMapService";

export const processGames = games => {
  return _.map(games, game => {
    let processedGame = _.omit(game, [
      "custom_game",
      "heroes_played",
      "rank",
      "score",
      "season_index",
      "url",
      "user_id",
      "viewable"
    ]);

    processedGame.heroes_played = _.chain(game.heroes_played)
      .sortBy(hero => _.takeRight(hero))
      .reverse()
      .map(hero => {
        return getFriendlyHeroName(_.dropRight(hero));
      })
      .flatten()
      .value();

    if (game.score) {
      processedGame.score = {
        blue: game.score[0],
        red: game.score[1]
      };
    }

    return processedGame;
  });
};

export const getGamesPage = (games, account, role, pageNum, numPerPage) => {
  return _.chain(games)
    .filter(
      game =>
        (account === "all" ? true : account === game.player_name) &&
        (role === "all" ? true : role === game.role)
    )
    .slice(pageNum * numPerPage, (pageNum + 1) * numPerPage)
    .value();
};
