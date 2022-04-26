const calculateWn8 = async function (eDamage, eSpot, eFrag, eDef, eWinrate, aDmg, aSpot, aFrag, aDef, aWinRate) {
  const expDmg = eDamage;
  const expSpot = eSpot;
  const expFrag = eFrag;
  const expDef = eDef;
  const expWinRate = eWinRate;

  const avgDmg = aDmg;
  const avgSpot = aSpot;
  const avgFrag = aFrag;
  const avgDef = aDef;
  const avgWinRate = aWinRate;

  const rDAMAGE = avgDmg / expDmg;
  const rSPOT = avgSpot / expSpot;
  const rFRAG = avgFrag / expFrag;
  const rDEF = avgDef / expDef;
  const rWIN = avgWinRate / expWinRate;

  const rWINc = Math.max(0, (rWIN - 0.71) / (1 - 0.71));
  const rDAMAGEc = Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
  const rFRAGc = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12)));
  const rSPOTc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38)));
  const rDEFc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF - 0.1) / (1 - 0.1)));

  const wn8 =
    980 * rDAMAGEc + 210 * rDAMAGEc * rFRAGc + 155 * rFRAGc * rSPOTc + 75 * rDEFc * rFRAGc + 145 * Math.min(1.8, rWINc);

  return Math.round(wn8);
};

module.exports = calculateWn8;
