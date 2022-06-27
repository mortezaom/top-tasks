import {defineStore} from 'pinia'
import type {RoadmapItem} from "@/interfaces/RoadmapItem";

export const useRoadmapStore = defineStore({
    id: 'roadmap',
    state: () => ({
        roadmapItems: <RoadmapItem[]>[
            {
                id: "asbs",
                name: "Html",
                learnTime: 10,
                workTime: 2,
                learnedTime: 2,
                videos: 3,
                roadmapId: "wqeasd",
                deleted: false
            },
            {
                id: "asbsasd",
                name: "CSS",
                learnTime: 12,
                learnedTime: 1,
                videos: 2,
                roadmapId: "wqeasd",
                deleted: false
            },
            {
                id: "asbsdasdas",
                name: "JavaScript",
                learnTime: 17,
                learnedTime: 0,
                videos: 5,
                roadmapId: "wqeasd",
                deleted: false
            },
        ],
    }),
    getters: {
        rItems: (state) => state.roadmapItems,
        totalHours: (s) => s.roadmapItems.reduce((accumulator, i) => {
            return accumulator + i.learnTime;
        }, 0),
        watchedHours: (s) => s.roadmapItems.reduce((accumulator, i) => {
            return accumulator + (i.learnedTime ?? 0);
        }, 0),
        workHours: (s) => s.roadmapItems.reduce((accumulator, i) => {
            return accumulator + (i.workTime ?? 0);
        }, 0),
        workedHours: (s) => s.roadmapItems.reduce((accumulator, i) => {
            return accumulator + (i.workedTime ?? 0);
        }, 0),
        totalVideos: (s) => s.roadmapItems.reduce((accumulator, i) => {
            return accumulator + (i.videos ?? 0);
        }, 0)
    },
    actions: {
        makeComplete({itemId, value}) {
            const item = this.roadmapItems.find((i) => i.id === itemId)
            if (!item) return
            item.learnedTime = (value) ? item.learnTime : 0;
            item.workedTime = (value) ? item.workTime : 0;
        },
        addToWorked({itemId, value}) {
            const item = this.roadmapItems.find((i) => i.id === itemId)
            if (!item) return
            item.workedTime = (item.workedTime ?? 0) + value
        },
        addToLearned({itemId, value}) {
            const item = this.roadmapItems.find((i) => i.id === itemId)
            if (!item) return
            item.learnedTime = (item.learnedTime ?? 0) + value
        },
        removeRoadmapItem(itemId) {
            const item = this.roadmapItems.find((item) => item.id === itemId)
            if (!item) return
            item.deleted = !item.deleted
        }
    }
})
