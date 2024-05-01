import HttpClient from "./httpClient"
import { MediaType } from "../components/map"

export const TeamMemberService = (function() {
  const getMembers = async (body) => {
    return await HttpClient.post('/', body)
  }

  return {
    getMembers,
  }
})()

export const getProjectsFromMonday = async function() {
  const body = {
    query: `{
            boards (ids: 1983862095) {
              items_page (limit: 40) {
                items {
                    id
                    name
                    column_values {
                        value
                    }
                }
              }
            }
        }`
  }
  const result = await TeamMemberService.getMembers(body)
  let projects = []
  if (result?.data?.data?.boards) {
    projects = result.data.data.boards[0].items_page.items.map(item => {
      let extras = { media_type: MediaType.none }
      const videos          = (JSON.parse(item.column_values[4].value || `{"text": ""}`).text || "").split(/\s+/)
      const images          = (JSON.parse(item.column_values[5].value || `{"text": ""}`).text || "").split(/\s+/)
      const latitude        = (item.column_values[1].value || "").replace(/"/g, "")
      const longitude       = (item.column_values[2].value || "").replace(/"/g, "")
      const placeName       = (item.column_values[0].value || "").replace(/"/g, "")
      const placeStory      = JSON.parse(item.column_values[3].value || `{"text": ""}`).text || ""
      let galleryAssets = videos.map(public_url => { return { file_extension: public_url.includes('youtu') ? 'youtube' : 'vimeo', public_url } })
      galleryAssets = galleryAssets.concat(images.map(public_url => { return { file_extension: '.jpg', public_url } }))
      galleryAssets = galleryAssets.filter(asset => asset.public_url !== "")
      if (item.assets && item.assets.length > 0) {
        const thisMediaType = galleryAssets.length > 0 ? MediaType.video : MediaType.image
        extras = { media_type: thisMediaType, image: item.assets[0].public_url, gallery: galleryAssets.concat(item.assets) }
      } else if (galleryAssets.length > 0) {
        extras = { media_type : MediaType.video, video: videos[0], gallery: galleryAssets }
      }
      return {
        ...extras,
        id: item.id,
        center: [parseFloat(longitude), parseFloat(latitude)],
        place_name: placeName,
        place_story: placeStory,
      }
    })
  }
  return projects
}

export const getProjectIdsFromMonday = async function() {
  const body = {
    query: `{
            boards (ids: 1983862095) {
              items_page (limit: 40) {
                items {
                    id
                }
              }
            }
        }`
  }
  const result = await TeamMemberService.getMembers(body)
  let projects = []
  if (result?.data?.data?.boards) {
    projects = result.data.data.boards[0].items_page.items.map(item => {
      return {
        id: item.id,
      }
    })
  }
  return projects
}

export const getProjectFromMonday = async function(id) {
  const body = {
    query: `{

                items (ids: [${id}]) {
                    column_values {
                        value
                    }
                }
            
        }`
  }
  const result = await TeamMemberService.getMembers(body)
  if (result?.data?.data?.boards) {
    const selectedItem = result.data.data.items[0]
    let extras = { media_type: MediaType.none }
    const videos          = (JSON.parse(selectedItem.column_values[4].value || `{"text": ""}`).text || "").split(/\s+/)
    const images          = (JSON.parse(selectedItem.column_values[5].value || `{"text": ""}`).text || "").split(/\s+/)
    const latitude        = (selectedItem.column_values[1].value || "").replace(/"/g, "")
    const longitude       = (selectedItem.column_values[2].value || "").replace(/"/g, "")
    const placeName       = (selectedItem.column_values[0].value || "").replace(/"/g, "")
    const placeStory      = JSON.parse(selectedItem.column_values[3].value || `{"text": ""}`).text || ""
    const testimonialUrl  = (selectedItem.column_values[6].value || "").replace(/"/g, "")
    const podcastUrl      = (selectedItem.column_values[7].value || "").replace(/"/g, "")
    let galleryAssets = videos.map(public_url => { return { file_extension: public_url.includes('youtu') ? 'youtube' : 'vimeo', public_url } })
    galleryAssets = galleryAssets.concat(images.map(public_url => { return { file_extension: '.jpg', public_url } }))
    galleryAssets = galleryAssets.filter(asset => asset.public_url !== "")
    if ( selectedItem.assets && selectedItem.assets.length > 0) {
      const thisMediaType = galleryAssets.length > 0 ? MediaType.video : MediaType.image
      extras = { media_type: thisMediaType, image: selectedItem.assets[0].public_url, gallery: galleryAssets.concat(selectedItem.assets) }
    } else if (galleryAssets.length > 0) {
      extras = { media_type : MediaType.video, video: videos[0], gallery: galleryAssets }
    }
    return {
      ...extras,
      id: id,
      center: [parseFloat(longitude), parseFloat(latitude)],
      place_name: placeName,
      place_story: placeStory,
      testimonial_url: testimonialUrl,
      podcast_url: podcastUrl,
    }
  }
}
export class TeamMember {
    constructor(image, name, title, bio, linkedin, twitter, email="") {
        this.image = image;
        this.name = name;
        this.title = title;
        this.bio = bio;
        this.linkedin = linkedin === "" ? undefined : linkedin;
        this.twitter = twitter === "" ? undefined :  twitter;
        this.email = email === "" ? undefined : `mailto:${email}`;
    }
}
export const getTeamMembersFromModay = async function() {
  const body = {
    query: `{
            boards (ids: 1383021348) {
              items_page (limit: 40) {
                items {
                  group {
                    title
                  }
                  name
                  column_values {
                    value
                  }
                  assets {
                    public_url
                  }
                }
              }
            }
        }`
  }
  const result = await TeamMemberService.getMembers(body)
  let teamMembers = []
  if (result.data?.data?.boards.length > 0) {
    const items = result.data.data.boards[0].items_page.items;
    teamMembers = items.reduce((acc, item) => {
      if (item.group.title === "BEN Team") {
        const teamMember = new TeamMember(
          item.assets.length > 0 ? item.assets[0].public_url : "",
          item.name,
          JSON.parse(item.column_values[2].value),
          JSON.parse(item.column_values[3].value),
          JSON.parse(item.column_values[5].value),
          JSON.parse(item.column_values[6].value),
          JSON.parse(item.column_values[7].value)
        )
        acc.push(teamMember)
        
      }
      return acc
    }, [])
  }
  return teamMembers
}
