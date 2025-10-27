import type { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiary } from "../types";
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

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
    const entry = diaries.find(diary => diary.id === id)
    if (entry != null) {
        const { comment, ...restOfEntry } = entry;
        return restOfEntry;
    }
}

export const addDiary = (newDiary : NewDiary) : DiaryEntry => {
    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...newDiary
    }

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};  

export const updateDiary = (id: number, updatedDiary: NewDiary): DiaryEntry | undefined => {
    const index = diaries.findIndex(diary => diary.id === id);
    if (index !== -1) {
        const updatedEntry = { id, ...updatedDiary };
        diaries[index] = updatedEntry;
        return updatedEntry;
    }
};
  
export const deleteDiary = (id: number): void => {
    const index = diaries.findIndex(diary => diary.id === id);
    if (index !== -1) {
        diaries.splice(index, 1);
    }       
};
