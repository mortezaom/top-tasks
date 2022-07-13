import type {RoadmapItem} from "@/interfaces/RoadmapItem";

interface Roadmap {
    _id?: string,
    name: string,
    userId?: string,
    items: RoadmapItem[]
}

export type {Roadmap}