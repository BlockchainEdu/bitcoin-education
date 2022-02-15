import HttpClient from "./httpClient";
import { MediaType } from "../components/map";

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
      const galleryVideoAssets = [{file_extension: '.mp4', public_url: video.replace(/"/g, "")}]
      if (item.assets.length > 0) {
        extras = { media_type: MediaType.image, image: item.assets[0].public_url, gallery: galleryVideoAssets.concat(item.assets) };
      } else if (item.column_values[5].value && item.column_values[5].value !== "") {
        extras = { media_type : MediaType.video, video: item.column_values[5].value.replace(/"/g, ""), gallery: galleryVideoAssets };
      }
      return {
        ...extras,
        id: item.id,
        center: [parseFloat(item.column_values[2].value.replace(/"/g, "")), parseFloat(item.column_values[1].value.replace(/"/g, ""))],
        place_name: item.column_values[0].value.replace(/"/g, ""),
        place_story: JSON.parse(item.column_values[3].value || `{"text": ""}`).text,
        slug: encodeURIComponent(item.column_values[0].value.replace(/"/g, "")),
      };
    });
  }
  return projects;
};
