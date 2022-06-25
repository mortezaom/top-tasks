interface RoadmapItem {
    id: string,
    name: string,
    totalTime: number,
    watchedTime?: number,
    videos?: number,
    roadmapId: string,
    isOptional?: boolean,
    deleted?: boolean,
}

export type {RoadmapItem}