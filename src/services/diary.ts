import type { DiaryEntry, NonSensitiveInfoDiaryEntry } from "../types";
import diaryData from "./diaries.json";

const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;
 
export const getEntries = (): DiaryEntry[] => diaries;

export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => {
        return {
        id, 
        date,  
        weather,
        visibility
    }    
});
}

export const addEntry = (): undefined => undefined;  

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
    const entry = diaries.find(diary => diary.id === id)
    if (entry != null) {
        const { comment, ...restOfEntry } = entry;
        return restOfEntry;
    }

}
