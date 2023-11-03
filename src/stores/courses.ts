import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from './auth'
import { ref } from 'vue'

const currentCourse = ref({
    chapters: [{
      children: [],
      display_name: '',
      id: '',
      section: [{}]
    }], 
    children: []
});



const { authToken } = storeToRefs(useAuthStore())
const token = authToken.value

const headers = {
  Authorization: `Bearer ${token}`
}

const baseUrl = import.meta.env.VITE_BASE_URL 

export const useCourseStore = defineStore('course', () => {

  const getCurrentCourse = async (): Promise<any> => {
    try {
      const url = `${baseUrl}/api/enrollment/v1/enrollment` 
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const response = await axios.get(url, { headers })
      const currentDate = Date.now()
      const currentCourseId = response.data.find((course: any) => Date.parse(course.course_details.course_end) > currentDate).course_details.course_id
      await fetchCourseDetails(currentCourseId);
      
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCourseDetails = async (courseId: string): Promise<any> => {
    try {
      const url = `${baseUrl}/api/course_home/v1/outline/${courseId}`
      
      const response = await axios.get(url, { headers })
      const course: any = Object.values(response.data.course_blocks.blocks).reduce((course: any, block: any) => {
        course.blocks ? course.blocks.push(block) : course.blocks = [block]
        return course
      }, {})

      currentCourse.value = course.blocks.find((block: any) => block.type === 'course');
      let currentChapterIndex: number;
      course.blocks.map((block: { type: string, id: never, children: [], section: [{}] }) => {
        if(block.type === 'chapter') {
            currentCourse.value.chapters ? currentCourse.value.chapters.push(block) : currentCourse.value.chapters = [block];
            currentChapterIndex = currentCourse.value.chapters.length-1;
        } else if (block.type === "sequential" && currentChapterIndex !== undefined && currentCourse.value.chapters[currentChapterIndex].children.includes(block.id)) {
            currentCourse.value.chapters[currentChapterIndex].section ? currentCourse.value.chapters[currentChapterIndex].section.push(block) : currentCourse.value.chapters[currentChapterIndex].section = [block]
        }
      });
    } catch (error) {
      console.error(error)
    }
  }


  return {
    getCurrentCourse,
    fetchCourseDetails,
    currentCourse
  }
})
