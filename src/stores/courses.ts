import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from './auth'
import { ref } from 'vue'

const currentCourse = ref({
  start_date: '',
  end_date: '',
  chapters: <any>[],
  course_name: '',
  course_img: '',
  course_discription: '',
  module_end_date: <any>[]
})

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
      const course = response.data.find(
        (course: any) => Date.parse(course.course_details.course_end) > currentDate
      )
      const currentCourseId = course.course_details.course_id
      currentCourse.value.start_date = course.course_details.course_start
      currentCourse.value.end_date = course.course_details.course_end
      currentCourse.value.course_name = course.course_details.course_name

      await fetchCourseDetails(currentCourseId)
      await getCourseImg(currentCourseId)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCourseDetails = async (courseId: string): Promise<any> => {
    try {
      const url = `${baseUrl}/api/course_home/v1/outline/${courseId}`

      const response = await axios.get(url, { headers })
      let chapters: any[]
      const courseBlock = Object.values(response.data.course_blocks.blocks).find(
        (block: any) => block.type === 'course'
      ) as any
      const courseBlockId = courseBlock.id

      const blocksDetailResp = await axios.get(
        `${baseUrl}/api/courses/v2/blocks/${courseBlockId}`,
        {
          headers,
          params: {
            depth: 'all',
            requested_fields: 'start',
            all_blocks: true
          }
        }
      )
      let currentChapterIndex: number

      const blocks = Object.values(response.data.course_blocks.blocks)

      blocks.map((block: any) => {
        if (block.type === 'chapter') {
          block.start = blocksDetailResp.data.blocks[block.id].start
          chapters ? chapters.push(block) : (chapters = [block])
          currentChapterIndex = chapters.length - 1
        } else if (
          block.type === 'sequential' &&
          currentChapterIndex !== undefined &&
          chapters !== undefined &&
          chapters[currentChapterIndex].children.includes(block.id)
        ) {
          block.start = blocksDetailResp.data.blocks[block.id].start
          chapters[currentChapterIndex].section
            ? chapters[currentChapterIndex].section.push(block)
            : (chapters[currentChapterIndex].section = [block])
        }
      })

      currentCourse.value.chapters = chapters

      // Extracting the due dates from the chapters of the current course
      const dueDates = currentCourse.value.chapters.reduce((duedate, chapter) => {
        // Check if the chapter has sections
        if (chapter.section && chapter.section.length >= 0) {
          // Find the biggest date in the chapter's sections
          const biggestDueDate = chapter.section.reduce((latest, section) => {
            // Parse the due date of each section 
            const sectionDueDate = Date.parse(section.due)
            // compare to find the biggest one date
            return sectionDueDate > latest ? sectionDueDate : latest
          }, 0)
          // Convert the biggestDueDate to ISO string and add to the due date array
          duedate.push(new Date(biggestDueDate).toISOString())
        }
        return duedate
      }, [])
      currentCourse.value.module_end_date = dueDates
    } catch (error) {
      console.error(error)
    }
  }


  const getCourseImg = async (courseId: string): Promise<any> => {
    try {
      const response = await axios.get(`${baseUrl}/api/courses/v1/courses/${courseId}`, { headers })
      currentCourse.value.course_img = baseUrl + response.data.media.course_image.uri
      currentCourse.value.course_discription = response.data.short_description
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getCurrentCourse,
    fetchCourseDetails,
    getCourseImg,
    currentCourse
  }
})
