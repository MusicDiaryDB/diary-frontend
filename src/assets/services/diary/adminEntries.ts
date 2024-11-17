import { diaryClient } from "../axios";

export interface Entry {
  Date: string;
  Description: string;
  EntryID: number;
  SongID: number;
  UserID: number;
  Visibility: string;
}

export const getAllEntries = async function (): Promise<Entry[]> {
  try {
    const resp = await diaryClient.get("/entries/all");
    return resp.data.result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteEntry = async function (entryId: number) {
  try {
    const resp = await diaryClient.delete(`/entry/${entryId}`);
    return resp.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
