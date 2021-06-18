import HttpClient from "./httpClient";

export const TeamMemberService = (function() {
    const getMembers = async (body) => {
        return await HttpClient.post('/', body)
    }

    return {
        getMembers,
    };
})();