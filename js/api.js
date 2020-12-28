const RESOURSE_URL = "http://127.0.0.1:8083/book";


const baseRequest = async({ urlPath = "", method = "GET", body = null }) => {
    try {
        const request = {
            method,

            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        };

        if (body) {
            request.body = JSON.stringify(body);
        }

        return await fetch(`${RESOURSE_URL}${urlPath}`, request);
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
};

export const getAllbooks = async() => {

    const response = await baseRequest({ method: "GET" });
    return await response.json();
};

export const addbook = (body) => baseRequest({ method: "POST", body });

export const updatebook = (id, body) => {
    baseRequest({ urlPath: `/${id}`, method: "PUT", body });
}

export const deletebook = (id) =>
    baseRequest({ urlPath: `/${id}`, method: "DELETE" });