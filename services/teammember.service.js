import HttpClient from "./httpClient"
import { MediaType } from "../components/map"

export const TeamMemberService = (function() {
  const getMembers = async (body) => {
    return await HttpClient.post('/', body)
  }

  return {
    getMembers,
  };
})();

export const getProjectsFromMonday = async function() {
  const body = {
    query: `{
            boards (ids: 1983862095) {
                items {
                    id
                    name
                    column_values {
                        value
                    }
                    assets {
                        file_extension
                        public_url
                    }
                }
            }
        }`
  };
  const result = await TeamMemberService.getMembers(body)
  let projects = []
  if (result?.data?.data?.boards) {
    projects = result.data.data.boards[0].items.map(item => {
      let extras = { media_type: MediaType.none }
      const video = item.column_values[5].value || ""
      const images = item.column_values[6].value || ""
      const latitude = item.column_values[1].value || ""
      const longitude = item.column_values[2].value || ""
      const placeName = item.column_values[0].value || ""
      const placeStory = item.column_values[3].value || `{"text": ""}`
      let galleryVideoAssets = video === null ? [] : [{file_extension: '.mp4', public_url: video.replace(/"/g, "")}]
      galleryVideoAssets = galleryVideoAssets.concat(images.replace(/"/g, "").split(' ').map(public_url => { return {file_extension: '.jpg', public_url } }))
      console.log({galleryVideoAssets})
      if (item.assets.length > 0) {
        const thisMediaType = galleryVideoAssets.length > 0 ? MediaType.video : MediaType.image;
        extras = { media_type: thisMediaType, image: item.assets[0].public_url, gallery: galleryVideoAssets.concat(item.assets) };
      } else if (galleryVideoAssets.length > 0) {
        extras = { media_type : MediaType.video, video: video.replace(/"/g, ""), gallery: galleryVideoAssets };
      }
      return {
        ...extras,
        id: item.id,
        center: [parseFloat(longitude.replace(/"/g, "")), parseFloat(latitude.replace(/"/g, ""))],
        place_name: placeName.replace(/"/g, ""),
        place_story: JSON.parse(placeStory).text,
      };
    });
  }
  return projects;
};

export const getProjectFromMonday = async function(id) {
  const body = {
    query: `{
            boards (ids: 1983862095) {
                items (ids: [${id}]) {
                    id
                    name
                    column_values {
                        value
                    }
                    assets {
                        file_extension
                        public_url
                    }
                }
            }
        }`
  };
  const result = await TeamMemberService.getMembers(body)
  if (result?.data?.data?.boards) {
    const selectedItem = result.data.data.boards[0].items[0]
    let extras = { media_type: MediaType.none }
    const video = selectedItem.column_values[5].value || ""
    const images = selectedItem.column_values[6].value || ""
    const latitude = selectedItem.column_values[1].value || ""
    const longitude = selectedItem.column_values[2].value || ""
    const placeName = selectedItem.column_values[0].value || ""
    const placeStory = selectedItem.column_values[3].value || `{"text": ""}`
    let galleryVideoAssets = video === "" ? [] : [{file_extension: '.mp4', public_url: video.replace(/"/g, "")}]
    galleryVideoAssets = galleryVideoAssets.concat(images.replace(/"/g, "").split(' ').map(public_url => { return {file_extension: '.jpg', public_url } }))
    console.log({galleryVideoAssets})
    if (selectedItem.assets.length > 0) {
      extras = { media_type: MediaType.image, image: selectedItem.assets[0].public_url, gallery: galleryVideoAssets.concat(selectedItem.assets) };
    } else if (galleryVideoAssets.length > 0) {
      extras = { media_type : MediaType.video, video: video.replace(/"/g, ""), gallery: galleryVideoAssets };
    }
    return {
      ...extras,
      id: selectedItem.id,
      center: [parseFloat(longitude.replace(/"/g, "")), parseFloat(latitude.replace(/"/g, ""))],
      place_name: placeName.replace(/"/g, ""),
      place_story: JSON.parse(placeStory).text,
    };
  }
};
