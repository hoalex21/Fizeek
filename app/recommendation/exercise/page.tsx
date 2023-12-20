"use client";

import NavBar from "@/app/ui/navbar";
import { useFormState } from "react-dom";
import Exercises from "./actions/exercises";
import { useEffect } from "react";

const initialState = {
    message: "",
    recommendations: []
}

export default function ExerciseRecommendation() {
    const [state, formAction] = useFormState(Exercises, initialState);

    useEffect(() => {
        const recommendationDiv = document.getElementById("recommendations");

        for (const recommendation of state.recommendations) {
            const div = document.createElement("div");
            const br = document.createElement("br");

            const name = document.createElement("p");
            const type = document.createElement("p");
            const muscle = document.createElement("p");
            const equipment = document.createElement("p");
            const difficulty = document.createElement("p");
            const instructions = document.createElement("p");

            name.innerText = recommendation.name;
            type.innerText = recommendation.type;
            muscle.innerText = recommendation.muscle;
            equipment.innerText = recommendation.equipment;
            difficulty.innerText = recommendation.difficulty;
            instructions.innerText = recommendation.instructions;

            div.append(name, type, muscle, equipment, difficulty, instructions, br);

            recommendationDiv?.append(div);
        }
    }, [state]);

    return (
        <>
            <NavBar />

            <div className="text-white mt-[calc(56px)]">
                <div className="w-screen text-center">
                    <p className="text-lg">Exercise Recommendations</p>

                    <br></br>

                    <div className="text-left flex justify-center">
                        <form action={formAction} className="w-fit">
                            <fieldset>
                                <div>
                                    <label htmlFor="name">Search: </label>
                                    <input name="name" id="name" className="text-black" />
                                </div>

                                <br></br>

                                <div>
                                    <label htmlFor="type">Select exercise type: </label>
                                    <select name="type" id="type" className="text-black w-max">
                                        <option value="">Type</option>
                                        <option value="cardio">Cardio</option>
                                        <option value="olympic_weightlifting">Olympic Weightlifting</option>
                                        <option value="plyometrics">Plyometrics</option>
                                        <option value="powerlifting">Powerlifting</option>
                                        <option value="strength">Strength</option>
                                        <option value="stretching">Stretching</option>
                                        <option value="strongman">Strongman</option>
                                    </select>
                                </div>

                                <br></br>

                                <div>
                                    <label htmlFor="muscle">Select muscle group: </label>
                                    <select name="muscle" id="muscle" className="text-black">
                                        <option value="">Muscle Group</option>
                                        <option value="abdominals">Abdominals</option>
                                        <option value="abductors">Abductors</option>
                                        <option value="adductors">Adductors</option>
                                        <option value="biceps">Biceps</option>
                                        <option value="calves">Calves</option>
                                        <option value="chest">Chest</option>
                                        <option value="forearms">Forearms</option>
                                        <option value="glutes">Glutes</option>
                                        <option value="hamstrings">Hamstrings</option>
                                        <option value="lats">Lats</option>
                                        <option value="lower_back">Lower Back</option>
                                        <option value="middle_back">Mid-Back</option>
                                        <option value="neck">Neck</option>
                                        <option value="quadriceps">Quadriceps</option>
                                        <option value="traps">Traps</option>
                                        <option value="triceps">Triceps</option>
                                    </select>
                                </div>

                                <br></br>

                                <div>
                                    <label htmlFor="difficulty">Select difficulty: </label>
                                    <select name="difficulty" id="difficulty" className="text-black">
                                        <option value="">Difficulty</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                </div>
                            </fieldset>

                            <br></br>

                            <button type="submit" className="w-full py-1 rounded-lg bg-white border-2 border-black text-black">Search</button>
                        </form>
                    </div>

                    <br></br>

                    {/* Populate exercise recommendations. Otherwise, show error message. */}
                    <div id="recommendations">

                    </div>
                </div>
            </div>
        </>
    );
}