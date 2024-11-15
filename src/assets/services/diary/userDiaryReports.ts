import { diaryClient } from "../axios";
import { getUserDiaryEntryIDs, getUserDiaryEntries } from "./userDiaryEntries";

// create new report
export const createUserDiaryReport = async function (
  visibility: string,
  userId: number,
  startDate: string,
  endDate: string,
): Promise<{ reportId: number; filteredEntries: any[] }> {
  // Filter entries by date range
  const filteredEntries = await getUserDiaryEntries(userId, startDate, endDate);
  const entryIDs = getUserDiaryEntryIDs(filteredEntries);

  const description =
    `You created ${entryIDs.length} diary entr${entryIDs.length === 1 ? "y" : "ies"}` +
    (startDate
      ? ` between ${startDate} and ${endDate || getCurrentDate()}!`
      : "!");

  // Create report
  let res;
  try {
    const form = new FormData();
    form.append("date", new Date().toDateString());
    form.append("description", description);
    form.append("visibility", visibility);
    form.append("userId", userId.toString());

    const resp = await diaryClient.post("/report/", form);
    res = resp.data;
  } catch (error) {
    console.log("Error creating report:", error);
  }

  console.log(res);
  const reportId = res["ReportID"];

  // Add entries to report
  entryIDs.forEach(async (entryId: number) => {
    try {
      const form = new FormData();
      form.append("reportId", reportId);
      form.append("entryId", entryId.toString());
      const resp = await diaryClient.post("/report_entry/", form);
      res = resp.data;
      console.log(res);
    } catch (error) {
      console.log("Error linking entry and report", error);
      throw error;
    }
  });

  return { reportId, filteredEntries };
};

export default createUserDiaryReport;

export const renderDiaryEntries = (
  entries: Array<{
    Date: string;
    Description: string;
    EntryID: number;
    SongID: number;
    UserID: number;
    Visibility: string;
  }>,
): string => {
  return entries
    .map(
      (entry) =>
        `Date: ${new Date(entry.Date).toLocaleDateString()}, ` +
        `Description: "${entry.Description}", ` +
        `EntryID: ${entry.EntryID}, ` +
        `SongID: ${entry.SongID}, ` +
        `Visibility: ${entry.Visibility}`,
    )
    .join("\n");
};

const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
