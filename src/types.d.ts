export type Visibility = "great" | "good" | "ok" | "poor";
export type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, "id" | "date" | "weather" | "visibility">;\

export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, "comment">;