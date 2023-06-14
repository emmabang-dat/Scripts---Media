function main() {
    let ss = SpreadsheetApp.openByUrl(""); // Enter the URL of YOUR sheet over there <—

  // don't change any code below this line
    let impressions = " metrics.impressions ";
    let clicks = " metrics.clicks ";
    let cost = " metrics.cost_micros ";
    let conv = " metrics.conversions ";
    let allConv = " metrics.all_conversions ";
    let cpa = " metrics.conversion_value / metrics.conversions ";
    let segDate = " segments.date ";
    let campName = " campaign.name ";
    let chType = " campaign.advertising_channel_type ";
    let adgName = " ad_group.name ";
    let order = " ORDER BY campaign.name ";
    let date30 = " segments.date DURING LAST_30_DAYS ";
  
    // Added filtering conditions for Performance Max campaigns
    let pMaxOnly = ' AND campaign.advertising_channel_type = "PERFORMANCE_MAX" ';
    let searchOnly = ' AND campaign.advertising_channel_type = "SEARCH" ';
    let agFilter = ' AND asset_group_listing_group_filter.type != "SUBDIVISION" ';
    let adgEnabled =
      ' AND ad_group.status = "ENABLED" AND campaign.status = "ENABLED" AND ad_group_ad.status = "ENABLED" ';
    let asgEnabled = ' asset_group.status = "ENABLED" AND campaign.status = "ENABLED" ';
    let notInter =
      ' AND segments.asset_interaction_target.interaction_on_this_asset != "TRUE" ';
    let inter = ' AND segments.asset_interaction_target.interaction_on_this_asset = "TRUE" ';
    let date07 = ' segments.date DURING LAST_7_DAYS ';
  
     // Build queries
    let cd = [
      impressions,
      clicks,
      cost,
      conv,
      allConv,
      cpa,
      segDate,
      campName,
      chType,
      adgName,
    ]; // campaign by day
    let campQuery =
      "SELECT " +
      cd.join(",") +
      " FROM campaign " +
      " WHERE " +
      date30 +
      searchOnly +
      order;
  
  // call report function to pull data and push it to the named tabs in the sheet
  runReport(campQuery, ss.getSheetByName("r_camp"));
} // end main

// query & export report data to named sheet
function runReport(q, sh) {
  const report = AdsApp.report(q);
  report.exportToSheet(sh);
}
  