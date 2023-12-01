"use client";

import { FormEvent } from "react";

export default function CalculatorBmi() {
    const notAvailable = "N/A";

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const bmiSpan = document.getElementById("bmi-result");
        const statusSpan = document.getElementById("bmi-status");

        if (bmiSpan) {
            bmiSpan.textContent = notAvailable;
        }

        if (statusSpan) {
            statusSpan.textContent = notAvailable;
        }
        
        const formData = new FormData(event.currentTarget);

        const feet = formData.get("feet")?.toString();
        const inches = formData.get("inches")?.toString();
        const pounds = formData.get("pounds")?.toString();

        let bmi = 0;

        if (feet && inches && pounds) {
            const feetFloat = parseFloat(feet);
            const inchesFloat = parseFloat(inches);
            const poundsFloat = parseFloat(pounds);

            const totalInches = (feetFloat * 12) + inchesFloat;

            bmi = (poundsFloat * 703.0) / (totalInches ** 2);

            if (bmiSpan) {
                bmiSpan.textContent = bmi.toFixed(2);
            }

            if (statusSpan) {
                let status = notAvailable;
                if (bmi < 18.5) {
                    status = "Underweight";
                } else if (18.5 <= bmi && bmi < 24.99) {
                    status = "Normal Weight";
                } else if (25 <= bmi && bmi < 30) {
                    status = "Overweight";
                } else {
                    status = "Obese";
                }
                statusSpan.textContent = status;
            }
        }
    }

    return (
        <div className="w-screen flex justify-center mt-[calc(56px)]">
            <div className="border-2 rounded-md w-3/12 p-5">
                <form onSubmit={onSubmit}>
                    <fieldset>
                        <legend className="text-xl text-center pb-5">Body Mass Index Calculator</legend>
                        <hr />

                        <div className="py-5">
                            <span>Height: </span>

                            <input className="w-10 border-2 rounded-md pl-1" maxLength={2} id="feet" name="feet" />
                            <label className="mr-4"> Feet</label>

                            <input className="w-10 border-2 rounded-md pl-1" maxLength={2} id="inches" name="inches" />
                            <label> Inches</label>

                            <br />
                            <br />

                            <span>Weight: </span>
                            <input className="w-10 border-2 rounded-md pl-1" id="pounds" name="pounds" />
                            <label> Pounds</label>

                            <br />
                            <br />

                            <div className="flex justify-end w-full">
                                <button type="submit" className="w-full bg-black text-white rounded-lg p-2">Calculate</button>
                            </div>
                        </div>
                    </fieldset>
                </form>
                <hr />

                <p className="pt-5">BMI: <span id="bmi-result">{notAvailable}</span></p>
                <p className="pt-5">Status: <span id="bmi-status">{notAvailable}</span></p>
            </div>
        </div>
    );
}