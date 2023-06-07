function main() {
  let ss = SpreadsheetApp.openByUrl(""); // Enter the URL of YOUR sheet over there <—

  // don't change any code below this line
  let impressions = " metrics.impressions ";
  let clicks = " metrics.clicks ";
  let cost = " metrics.cost_micros ";
  let conv = " metrics.conversions ";
  let allConv = " metrics.all_conversions ";
  let segDate = " segments.date ";
  let campName = " campaign.name ";
  let chType = " campaign.advertising_channel_type ";
  let adgName = " ad_group.name ";
  let order = " ORDER BY campaign.name ";
  let date30 = " segments.date DURING LAST_30_DAYS ";

  // Build queries
  let cd = [
    impressions,
    clicks,
    cost,
    conv,
    allConv,
    segDate,
    campName,
    chType,
    adgName,
  ]; // campaign by day
  let campQuery =
    "SELECT " + cd.join(",") + " FROM campaign " + " WHERE " + date30 + order;

  // call report function to pull data and push it to the named tabs in the sheet
  runReport(campQuery, ss.getSheetByName("r_camp"));
} // end main

// query & export report data to named sheet
function runReport(q, sh) {
  const report = AdsApp.report(q);
  report.exportToSheet(sh);
}