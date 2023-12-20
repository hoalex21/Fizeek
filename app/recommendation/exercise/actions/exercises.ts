"use server";

const key = process.env.NINJAS_KEY;
const url = "https://api.api-ninjas.com/v1/exercises";

export default async function Exercises(prevState: any, formData: FormData) {
    const name = formData.get("name");
    const type = formData.get("type");
    const muscle = formData.get("muscle");
    const difficulty = formData.get("difficulty");

    await fetch(
        url + 
        `${name ? "?name=" + name : ""}` + 
        `${type ? "?type=" + type : ""}` + 
        `${muscle ? "?muscle=" + muscle : ""}` + 
        `${difficulty ? "?difficulty=" + difficulty : ""}`, 
        {
            headers: {
                'X-Api-Key': key ? key : ""
            }
        }
    ).then(async (response) => {
        const data = await response.json();
        if (data.error) {
            prevState.message = data.error;
            prevState.recommendations = [];
        } else {
            prevState.message = "";
            prevState.recommendations = data;
        }
    }).catch((error) => {
        console.log(error);
        prevState.message = error;
        prevState.recommendations = [];
    });

    return prevState;
}