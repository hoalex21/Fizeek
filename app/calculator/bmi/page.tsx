"use client";

export default function CalculatorBmi() {
    return (
        <div className="w-screen flex justify-center mt-[calc(56px)]">
            <div className="border-2 rounded-md w-3/12 p-5">
                <form>
                    <fieldset>
                        <legend className="text-xl text-center pb-5">Body Mass Index Calculator</legend>
                        <hr />

                        <div className="py-5">
                            <span>Height: </span>

                            <input className="w-10 border-2 rounded-md pl-1" />
                            <label className="mr-4"> Feet</label>

                            <input className="w-10 border-2 rounded-md pl-1" />
                            <label> Inches</label>

                            <br />
                            <br />

                            <span>Weight: </span>
                            <input className="w-10 border-2 rounded-md pl-1" />
                            <label> Pounds</label>
                        </div>
                    </fieldset>
                </form>
                <hr />

                <p className="pt-5">BMI: <span id="bmi-result">N/A</span></p>
            </div>
        </div>
    );
}