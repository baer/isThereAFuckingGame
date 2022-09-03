module.exports = {
  reactStrictMode: true,
  // Since the site is exposted statically, the fancy Next.js image opts need
  // to be turned off.
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  env: {
    homeTeam: "Rockies",
    homeStadium: "Coors Field - Denver",
    websiteDescription: "Is there a fucking Rockies game today?",

    // TODO: Use These
    googleAnalytics: "UA-32746833-1",
    websiteKeywords:
      "rockies, colorado rockies, rockies game, schedule, mlb, baseball, major league baseball",
  },
};
