interface RoadmapItem {
    id: string,
    name: string,
    learnTime: number,
    learnedTime?: number,
    workTime? : number,
    workedTime? : number,
    videos?: number,
    roadmapId: string,
    isOptional?: boolean,
    deleted?: boolean,
}

export type {RoadmapItem}