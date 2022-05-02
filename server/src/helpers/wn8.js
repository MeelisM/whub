const calculateWn8 = function (data) {
  const avgDef = data.avgDef;
  const avgDmg = data.avgDmg;
  const avgSpot = data.avgSpot;
  const avgWinRate = data.avgWinRate;
  const avgFrag = data.avgFrag;
  const survived = data.survived;

  const rDAMAGE = data.avgDmg / data.expDmg;
  const rSPOT = data.avgSpot / data.expSpot;
  const rFRAG = data.avgFrag / data.expFrag;
  const rDEF = data.avgDef / data.expDef;
  const rWIN = data.avgWinRate / data.expWinRate;

  const rWINc = Math.max(0, (rWIN - 0.71) / (1 - 0.71));
  const rDAMAGEc = Math.max(0, (rDAMAGE - 0.22) / (1 - 0.22));
  const rFRAGc = Math.max(0, Math.min(rDAMAGEc + 0.2, (rFRAG - 0.12) / (1 - 0.12)));
  const rSPOTc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rSPOT - 0.38) / (1 - 0.38)));
  const rDEFc = Math.max(0, Math.min(rDAMAGEc + 0.1, (rDEF - 0.1) / (1 - 0.1)));

  const wn8 =
    980 * rDAMAGEc + 210 * rDAMAGEc * rFRAGc + 155 * rFRAGc * rSPOTc + 75 * rDEFc * rFRAGc + 145 * Math.min(1.8, rWINc);

  return { IDNum: data.id, wn8: Math.round(wn8), avgDef, avgDmg, avgSpot, avgWinRate, avgFrag, survived };
};

module.exports = calculateWn8;
