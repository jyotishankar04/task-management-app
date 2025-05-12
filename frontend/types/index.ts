import { DASHBOARD_STATS_CARD_DATA, TASKS_TABLE_DATA } from "@/utils/constants.utils";


// get the type of the data in DASHBOARD_STATS_CARD_DATA
export type TDashStatsCardData = typeof DASHBOARD_STATS_CARD_DATA[number];
// get the type of the data in TASK_TABLE_DATA
export type TTaskTableData = typeof TASKS_TABLE_DATA[number];