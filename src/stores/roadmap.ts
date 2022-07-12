import {defineStore} from 'pinia'
import type {Roadmap} from "@/interfaces/Roadmap";
import useApi from "@/utils/useApi";

interface IRoadmapType {
    allRoadmaps: Roadmap[],
    myRoadmaps: Roadmap[],
    selectedRoadmap: Roadmap | null,
    error: string | null,
}

export const useRoadmapStore = defineStore({
    id: 'roadmap',
    state: (): IRoadmapType => ({
        allRoadmaps: [],
        myRoadmaps: [],
        selectedRoadmap: null,
        error: null,
    }),
    getters: {
        sRoadmap: (s) => s.selectedRoadmap,
        totalHours: (s) => s.selectedRoadmap?.items.reduce((accumulator, i) => {
            return accumulator + i.learnTime;
        }, 0) ?? 0,
        watchedHours: (s) => s.selectedRoadmap?.items.reduce((accumulator, i) => {
            return accumulator + (i.learnedTime ?? 0);
        }, 0) ?? 0,
        workHours: (s) => s.selectedRoadmap?.items.reduce((accumulator, i) => {
            return accumulator + (i.workTime ?? 0);
        }, 0) ?? 0,
        workedHours: (s) => s.selectedRoadmap?.items.reduce((accumulator, i) => {
            return accumulator + (i.workedTime ?? 0);
        }, 0) ?? 0,
        totalVideos: (s) => s.selectedRoadmap?.items.reduce((accumulator, i) => {
            return accumulator + (i.videos ?? 0);
        }, 0) ?? 0,
        myRoadmaps: (state) => state.myRoadmaps ?? [],
    },
    actions: {
        changeCurrent(itemId) {
            this.selectedRoadmap = this.myRoadmaps.find((item) => item._id == itemId) ?? null
        },
        makeComplete({itemId, value}) {
            const item = this.selectedRoadmap!.items.find((i) => i._id === itemId)
            if (!item) return
            item.learnedTime = (value) ? item.learnTime : 0;
            item.workedTime = (value) ? item.workTime : 0;
        },
        addToWorked({itemId, value}) {
            const item = this.selectedRoadmap!.items.find((i) => i._id === itemId)

            if (!item) return
            item.workedTime = (item.workedTime ?? 0) + value
        },
        addToLearned({itemId, value}) {

            const item = this.selectedRoadmap!.items.find((i) => i._id === itemId)
            if (!item) return
            item.learnedTime = (item.learnedTime ?? 0) + value
        },
        removeRoadmapItem(itemId) {
            const item = this.selectedRoadmap!.items.find((item) => item._id === itemId)
            if (!item) return
            item.deleted = !item.deleted
        },
        async fetchMyRoadmaps() {
            const {error, data} = await useApi(`/api/v1/roadmaps/my`).get().json()
            if (error.value == null) {
                this.myRoadmaps.length = 0
                this.myRoadmaps.push(...data.value)
            } else {
                this.error = error.value
            }
        },
        async fetchAllRoadmaps() {
            const {error, data} = await useApi(`/api/v1/roadmaps/`).get().json()
            if (error.value == null) {
                this.allRoadmaps.length = 0
                this.allRoadmaps.push(...data.value)
            } else {
                this.error = error.value
            }
        },
        async setRoadmapItems(roadmap: Roadmap) {
            const {error, data} = await useApi(`/api/v1/roadmaps/${roadmap._id}`).put().json()
            if (error.value == null) {
                this.allRoadmaps.map((e) => e._id != roadmap._id ? e : data)
                this.myRoadmaps.map((e) => e._id != roadmap._id ? e : data)
                this.selectedRoadmap = data.value
            } else {
                this.error = error.value
            }
        },
        async deleteRoadmapItems(roadmap: Roadmap) {
            const {error, data} = await useApi(`/api/v1/roadmaps/`).delete(JSON.stringify(roadmap)).json()
            if (error.value == null) {
                this.allRoadmaps.length = 0
                this.allRoadmaps.push(...data.value)
            } else {
                this.error = error.value
            }
        }
    }
})
