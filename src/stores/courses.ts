import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from './auth'
import { ref } from 'vue'

const currentCourse = ref({
  start_date: '',
  end_date: '',
  chapters: <any>[],
  course_name: '',
  course_img:''
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
    } catch (error) {
      console.error(error)
    }
  }

  const getCourseImg = async (courseId: string): Promise<any> => {
    try {
      const response = await axios.get(`${baseUrl}/api/courses/v1/courses/${courseId}`, { headers })
      console.log(response.data.media.course_image.uri)
      const courseImage =  baseUrl+response.data.media.course_image.uri
      currentCourse.value.course_img = courseImage
    } catch(error) {
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
