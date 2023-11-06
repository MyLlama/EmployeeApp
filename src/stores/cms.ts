import axios from 'axios'
import { defineStore } from 'pinia'

const baseUrl = import.meta.env.VITE_CMS_BASE_URL
const url = `${baseUrl}/api/ea-contents?populate=*`
export const useCmsStore = defineStore('cms', () => {
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_AUTH_TOKEN}`
  }

  const activityData = async (): Promise<any> => {
    try {
      const response = await axios.get(url, { headers })
      const randomData = Math.floor(Math.random() * response.data.data.length)
      const type = response.data.data[randomData].attributes.type
      let media
      if (type === 'video' || type === 'audio') {
        media = response.data.data[randomData].attributes.media.data.reduce(
          (media: any, item: any) => {
            if (item.attributes.url.includes('mp4') || item.attributes.url.includes('mp3'))
              media.data = baseUrl + item.attributes.url
            else media.thumbnail = baseUrl + item.attributes.url
            return media
          },
          {}
        )
      } else {
        media = response.data.data[randomData].attributes.media.data.map(
          (item: any) => baseUrl + item.attributes.url
        )
      }
      return { media, type }
    } catch (error) {
      console.error(error)
    }
  }

  return {
    activityData
  }
})
