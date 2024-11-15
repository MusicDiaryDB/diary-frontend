import { diaryClient } from "../axios";

interface Entry {
  EntryID: number;
  Date: string;
  Description: string;
  UserID: number;
  SongID: number;
}

export const getUserDiaryEntries = async function (
  userId: number,
  startDate: string | null,
  endDate: string | null,
) {
  let entries;

  try {
    // Fetch user entries
    const resp = await diaryClient.get(`/entry/user/${userId}`);
    entries = resp.data.result;
  } catch (error) {
    console.log("Error fetching user entries:", error);
    throw error;
  }

  // Filter entries by date range
  if (!startDate) return entries;

  const ed = endDate ? endDate : new Date();
  console.log(entries, new Date(startDate), ed, new Date(entries[0].date));

  return entries.filter((entry: Entry) => {
    const entryDate = new Date(entry.Date);
    return entryDate >= new Date(startDate) && entryDate <= ed;
  });
};

export const getUserDiaryEntryIDs = function (entries: Entry[]) {
  return entries.map((entry: Entry) => entry.EntryID);
};
