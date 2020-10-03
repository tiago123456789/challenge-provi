import axios from "axios";

class HttpClient {

    get(url: string, headers: { [key: string]: any }) {
       return axios.get(url).then(this.extractDatasInResponse);
    }

    private extractDatasInResponse(response: any) {
        return response.data;
    }
}

export default HttpClient;