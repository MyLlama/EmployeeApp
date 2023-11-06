import ColorThief from 'colorthief'
import colorPalettes from './colorPalettes.json'

export const getBaseColorAndClosestPalette = async (
  imageUrl: string
): Promise<{ baseColor: number[]; closestPalette: { name: string; colors: number[][] } }> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const baseColor = await getBaseColor(imageUrl)
      const closestPalette = findClosestPalette(baseColor)
      resolve({ baseColor, closestPalette })
    } catch (error) {
      reject(error)
    }
  })
}

const getBaseColor = (imageUrl: string): Promise<number[]> => {
  return new Promise((resolve, reject) => {
    const colorThief = new ColorThief()
    const imgElement = new Image()
    const googleProxyURL =
      'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url='
    imgElement.crossOrigin = 'Anonymous'
    imgElement.src = googleProxyURL + encodeURIComponent(imageUrl)

    imgElement.onload = () => {
      const baseColor = colorThief.getColor(imgElement)
      resolve(baseColor)
    }

    imgElement.onerror = () => {
      reject(new Error('Failed to load image'))
    }
  })
}

const findClosestPalette = (baseColor: number[]): { name: string; colors: number[][] } => {
  let closestPalette = colorPalettes[0]
  let closestDistance = Infinity

  colorPalettes.forEach((palette) => {
    palette.colors.forEach((color) => {
      const distance = colorDistance(baseColor, color)
      if (distance < closestDistance) {
        closestDistance = distance
        closestPalette = palette
      }
    })
  })

  return closestPalette
}

const colorDistance = (color1: number[], color2: number[]): number => {
  return Math.sqrt(
    Math.pow(color1[0] - color2[0], 2) +
      Math.pow(color1[1] - color2[1], 2) +
      Math.pow(color1[2] - color2[2], 2)
  )
}
