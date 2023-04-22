import PageButton from "../ui/PageButton";
import AlertBox from "../ui/AlertBox";
import CardLayout from "../layouts/CardLayout";
import { useContext, useState } from "react";
import { PageContext } from "../contexts/PageContext";

import { getIsValidAge } from "./helpers";

// TODO: Save Input data
function UserDetails() {
	const { allPages, setPage } = useContext(PageContext);

	const [error, setError] = useState(null);
	const [userDetails, setUserDetails] = useState({
		gender: null,
		age: null,
		employmentStatus: null,
	});

	function handleAgeChange({ target }) {
		const { value } = target;
		const age = Number(value);

		if (!getIsValidAge(age)) return; // Restrict input.

		age < 18 ? setError("Please enter an age greater than 18.") : setError(null);

		setUserDetails(prevUserDetails => {
			const newUserDetails = { ...prevUserDetails };
			newUserDetails.age = value;
			return newUserDetails;
		});
	}

	function handleRadioButtonChange({ target }) {
		const { name } = target;

		switch (name) {
			case "radio-gender": {
				const { value: gender } = target;

				setUserDetails(prevUserDetails => {
					const newUserDetails = { ...prevUserDetails };
					newUserDetails.gender = gender;

					return newUserDetails;
				});
				break;
			}

			case "radio-employment-status": {
				const { value: employmentStatus } = target;

				setUserDetails(prevUserDetails => {
					const newUserDetails = { ...prevUserDetails };
					newUserDetails.employmentStatus = employmentStatus;

					return newUserDetails;
				});
				break;
			}

			default:
				throw new Error("Invalid radio button.");
		}
	}

	function handleNextButtonClick() {
		let isAllAnswered = false;
		
		for (let key in userDetails) {
			isAllAnswered = Boolean(userDetails[key]);
			if (!isAllAnswered) break;
		}		

		if (!isAllAnswered) {
			setError("Please answer all questions to continue.");
			return;
		}

		if (userDetails.age < 18) {
			setError("Please enter an age greater than 18.");
			return;
		}

		setError(null);
		setPage(allPages.questions);
	}

	return (
		<CardLayout showInfo>
			<ol className="list-group list-group-flush">
				<li className="list-group-item">
					<div>
						<div className="sub-question-container">
							<strong>What is your gender?</strong>
						</div>
						<div className="form-check radio-spacing mt-2">
							<input
								className="form-check-input"
								type="radio"
								name="radio-gender"
								id="radioGenderMale"
								value="male"
								checked={userDetails.gender === "male"}
								onChange={handleRadioButtonChange}
							/>
							<label
								className="form-check-label"
								htmlFor="radioGenderMale"
							>
								Male
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-gender"
								id="radioGenderFemale"
								value="female"
								checked={userDetails.gender === "female"}
								onChange={handleRadioButtonChange}
							/>
							<label
								className="form-check-label"
								htmlFor="radioGenderFemale"
							>
								Female
							</label>
						</div>
						<div className="form-check radio-spacing mb-3">
							<input
								className="form-check-input"
								type="radio"
								name="radio-gender"
								id="radioGenderTransgender"
								value="transgender"
								checked={userDetails.gender === "transgender"}
								onChange={handleRadioButtonChange}
							/>
							<label
								className="form-check-label"
								htmlFor="radioGenderTransgender"
							>
								Transgender
							</label>
						</div>
					</div>

					<div className="mt-4">
						<div className="sub-question-container">
							<strong>What is your age?</strong>
						</div>
						<div className="form-group col-sm-4 input-group-sm mt-2">
							<input
								type="number"
								className="form-control"
								name="age"
								id="txtAge"
								value={userDetails.age || ""}
								onChange={handleAgeChange}
								min="18"
								max="100"
							/>
							<label htmlFor="txtAge"></label>
						</div>
					</div>

					<div className="mt-2">
						<div className="sub-question-container">
							<strong>How are you mainly employed at the moment?</strong>
						</div>
						<div className="form-check radio-spacing mt-2">
							<input
								className="form-check-input"
								type="radio"
								name="radio-employment-status"
								id="radioEmploymentStatusNotEmployed"
								value="notEmployed"
								checked={userDetails.employmentStatus === "notEmployed"}
								onChange={handleRadioButtonChange}
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusNotEmployed"
							>
								Not employed
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-employment-status"
								id="radioEmploymentStatusFullTime"
								value="fullTime"
								checked={userDetails.employmentStatus === "fullTime"}
								onChange={handleRadioButtonChange}
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusFullTime"
							>
								Full time
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-employment-status"
								id="radioEmploymentStatusPartTime"
								value="partTime"
								checked={userDetails.employmentStatus === "partTime"}
								onChange={handleRadioButtonChange}
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusPartTime"
							>
								Part time/casual
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-employment-status"
								id="radioEmploymentStatusStudent"
								value="student"
								checked={userDetails.employmentStatus === "student"}
								onChange={handleRadioButtonChange}
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusStudent"
							>
								Student
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-employment-status"
								id="radioEmploymentStatusHomeDuties"
								value="homeDuties"
								checked={userDetails.employmentStatus === "homeDuties"}
								onChange={handleRadioButtonChange}
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusHomeDuties"
							>
								Home duties
							</label>
						</div>
					</div>
				</li>
			</ol>

			{error && <AlertBox>{error}</AlertBox>}

			<div className="text-center mt-4 mb-2 p-2 mx-5 d-grid gap-2 d-md-block row d-flex">
				<PageButton
					buttonClass="btn btn-success"
					buttonText="Next >"
					handlePageButtonClick={handleNextButtonClick}
				/>
			</div>
		</CardLayout>
	);
}

export default UserDetails;
