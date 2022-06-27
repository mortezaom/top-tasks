import { defineStore } from 'pinia'
import type {RoadmapItem} from "@/interfaces/RoadmapItem";

export const useRoadmapStore = defineStore({
  id: 'roadmap',
  state: () => ({
    counter: 0,
    content: <RoadmapItem[]>[
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
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
