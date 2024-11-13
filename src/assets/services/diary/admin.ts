import { diaryClient } from "../axios";

/**
 * DB info endpoint helpers
 */

export const getInfoRows = async () => {
  try {
    const resp = await diaryClient.get("/admin/info/rows");
    return resp.data;
  } catch (error) {
    console.log("Error getting database-wide row information:", error);
    throw error;
  }
};

export const getDBSize = async function () {
  try {
    const resp = await diaryClient.get("/admin/info/dbsize");
    return resp.data;
  } catch (error) {
    console.log("Error getting database-wide size information:", error);
    throw error;
  }
};

export const getTableSizes = async function () {
  try {
    const resp = await diaryClient.get("/admin/info/tablesize");
    return resp.data;
  } catch (error) {
    console.log("Error getting database table size information:", error);
    throw error;
  }
};

export const getConns = async function () {
  try {
    const resp = await diaryClient.get("/admin/info/conns");
    return resp.data;
  } catch (error) {
    console.log("Error getting database connections information:", error);
    throw error;
  }
};

export const getConnsActivity = async function () {
  try {
    const resp = await diaryClient.get("/admin/info/conns-activity");
    return resp.data;
  } catch (error) {
    console.log(
      "Error getting database connections activity information:",
      error,
    );
    throw error;
  }
};

/**
 * DB perf endpoint helpers
 */

export const getCacheHitRatio = async function () {
  try {
    const resp = await diaryClient.get("/admin/perf/cache-hit-ratio");
    return resp.data;
  } catch (error) {
    console.log("Error getting database cache-hit-ratio info:", error);
    throw error;
  }
};

export const getLongRunningQueries = async function () {
  try {
    const resp = await diaryClient.get("/admin/perf/long-running-queries");
    return resp.data;
  } catch (error) {
    console.log("Error getting database cache-hit-ratio info:", error);
    throw error;
  }
};
