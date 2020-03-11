import {
  isVideo, isAudio, isImage, isYoutubeUrl, isAmazonUrl, isEmpty, isInstagramUrl
} from './utils'
import ScrapVideo from './Video/ScrapVideo'
import ScrapAudio from './Audio/ScrapAudio'
import ScrapImage from './Image/ScrapImage'
import ScrapYoutube from './Youtube/ScrapYoutube'
import ScrapAmazon from './Amazon/ScrapAmazon'
import ScrapDefault from './Default/ScrapDefault'
import ScrapInstagram from './Instagram/ScrapInstagram'

export default async (url: string, httpClient, defaultMedia: string[]) => {
  if (!isEmpty(url)) {
    const response = await httpClient
    const mimeType = response.headers.get('content-type')
    const data = await response.text()
    const htmlDoc = new DOMParser().parseFromString(data, 'text/html')
    if (isVideo(mimeType)) {
      return ScrapVideo(url, defaultMedia)
    } if (isAudio(mimeType)) {
      return ScrapAudio(url, defaultMedia)
    } if (isImage(mimeType)) {
      return ScrapImage(url, defaultMedia)
    } if (isInstagramUrl(url)) {
      return ScrapInstagram(url, htmlDoc, data, defaultMedia)
    } if (isYoutubeUrl(url)) {
      return ScrapYoutube(url, htmlDoc, defaultMedia)
    } if (isAmazonUrl(url)) {
      return ScrapAmazon(url, htmlDoc, defaultMedia)
    }
    return ScrapDefault(url, htmlDoc, defaultMedia)
  }
  return null
}
