import { diaryClient } from "../axios";

export interface DiaryReport {
  Date: string;
  Description: string;
  ReportID: number;
  UserID: number;
  Visibility: string;
}

export const getAllReports = async function (): Promise<DiaryReport[]> {
  try {
    const resp = await diaryClient.get(`/reports/all`);
    let res = resp.data.result;
    return res;
  } catch (error) {
    console.log("Error fetching all reviews:", error);
    throw error;
  }
};

export const deleteReport = async function (
  reportId: number,
): Promise<boolean> {
  try {
    const resp = await diaryClient.delete(`/report/${reportId}`);
    let res = resp.data.message;
    return res === "DiaryReport deleted";
  } catch (error) {
    console.log("Error deleting report with ID:", reportId, error);
    throw error;
  }
};
