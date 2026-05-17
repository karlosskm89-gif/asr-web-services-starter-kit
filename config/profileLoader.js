// config/profileLoader.js
// Loads the active template profile from TEMPLATE_PROFILE.
// The exported object is the active profile itself, with named helper exports attached.

const asrWebServices = require("../modules/asr/asrWebServices");
const plasterer = require("../modules/builder/plasterer");
const lifeCoach = require("../modules/coach/lifeCoach");
const cafeDemo = require("../modules/cafe/coffeeShop");

const author = require("../modules/artist/author");
const painter = require("../modules/artist/painter");
const photographer = require("../modules/artist/photographer");

const accountant = require("../modules/corporate/accountant");
const consultant = require("../modules/corporate/consultant");
const solicitor = require("../modules/corporate/solicitor");

const band = require("../modules/entertainer/band");
const dj = require("../modules/entertainer/dj");
const bouncyCastles = require("../modules/entertainer/bouncyCastles");
const clowns = require("../modules/entertainer/clowns");
const facePainter = require("../modules/entertainer/facePainter");

const charity = require("../modules/nonProfits/charity");
const clubs = require("../modules/nonProfits/clubs");

const restaurant = require("../modules/cafe/restaurant");
const takeAway = require("../modules/cafe/takeAway");

const musicLessons = require("../modules/coach/musicLessons");
const sportCoach = require("../modules/coach/sportCoach");

const profiles = {
  asrWebServices,
  plasterer,
  lifeCoach,
  cafeDemo,
  author,
  painter,
  photographer,
  accountant,
  consultant,
  solicitor,
  band,
  dj,
  bouncyCastles,
  clowns,
  facePainter,
  charity,
  clubs,
  restaurant,
  takeAway,
  musicLessons,
  sportCoach,
};

function loadProfile(keyFromEnv) {
  const fallbackKey = "asrWebServices";
  const key = keyFromEnv && profiles[keyFromEnv] ? keyFromEnv : fallbackKey;

  if (keyFromEnv && !profiles[keyFromEnv]) {
    console.warn(
      `[profileLoader] Unknown TEMPLATE_PROFILE "${keyFromEnv}". Falling back to "${fallbackKey}".`
    );
  }

  const profile = profiles[key];
  profile._profileKey = key;
  profile._availableProfiles = Object.keys(profiles);
  return profile;
}

const builder = loadProfile(process.env.TEMPLATE_PROFILE || "asrWebServices");

module.exports = builder;
module.exports.builder = builder;
module.exports.default = builder;
module.exports.loadProfile = loadProfile;
module.exports.profiles = profiles;
