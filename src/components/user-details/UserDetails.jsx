import PageButton from "../ui/PageButton";
import AlertBox from "../ui/AlertBox";
import CardLayout from "../layouts/CardLayout";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";

import { getIsValidAge } from "./helpers";

// TODO: Save Input data
function UserDetails() {
	const { translation, allPages, setPage } = useContext(AppContext);

	const [error, setError] = useState(null);
	const [userDetails, setUserDetails] = useState({
		gender: null,
		age: null,
		education: null,
		placeOfResidence: null,
		economicStatus: null,
		employmentStatus: null,
	});

	function handleAgeChange({ target }) {
		const { value } = target;
		const age = Number(value);

		if (!getIsValidAge(age)) return; // Restrict input.

		age < 18 ? setError(translation.alert.ageGreaterThan18) : setError(null);

		setUserDetails(prevUserDetails => {
			const newUserDetails = { ...prevUserDetails };
			newUserDetails.age = value;
			return newUserDetails;
		});
	}

	function handleRadioButtonChange({ target }) {
		const { dataset, value } = target;

		setUserDetails(prevUserDetails => {
			let key = dataset.userDetail;			

			const newUserDetails = {...prevUserDetails};
			newUserDetails[key] = value;

			return newUserDetails;
		});
	}

	function handleNextButtonClick() {
		let isAllAnswered = false;

		for (let key in userDetails) {
			isAllAnswered = Boolean(userDetails[key]);
			if (!isAllAnswered) break;
		}

		if (!isAllAnswered) {
			setError(translation.alert.answerAllQuestions);
			return;
		}

		if (userDetails.age < 18) {
			setError(translation.alert.ageGreaterThan18);
			return;
		}

		setError(null);
		setPage(allPages.questions);
	}

	return (
		<CardLayout showInfo>
			<ol className="list-group list-group-flush">
				<li className="list-group-item">
					{/* Gender */}
					<div>
						<div className="sub-question-container">
							<strong>{translation.userDetails.gender}</strong>
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
								data-user-detail = "gender"
							/>
							<label
								className="form-check-label"
								htmlFor="radioGenderMale"
							>
								{translation.userDetails.male}
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
								data-user-detail = "gender"
							/>
							<label
								className="form-check-label"
								htmlFor="radioGenderFemale"
							>
								{translation.userDetails.female}
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
								data-user-detail = "gender"
							/>
							<label
								className="form-check-label"
								htmlFor="radioGenderTransgender"
							>
								{translation.userDetails.transgender}
							</label>
						</div>
					</div>

					{/* Age */}
					<div className="mt-4">
						<div className="sub-question-container">
							<strong>{translation.userDetails.age}</strong>
						</div>
						<div className="form-group col-sm-4 input-group-sm mt-2">
							<input
								type="number"
								className="form-control"
								name="age"
								id="txtAge"
								value={userDetails.age || ""}
								onChange={handleAgeChange}
								data-user-detail = "age"
								min="18"
								max="100"
							/>
							<label htmlFor="txtAge"></label>
						</div>
					</div>

					{/* Place of residence */}
					<div className="mt-1">
						<div className="sub-question-container">
							<strong>{translation.userDetails.placeOfResidence}</strong>
						</div>
						<div className="form-check radio-spacing mt-2">
							<input
								className="form-check-input"
								type="radio"
								name="radio-place-of-residence"
								id="radioPlaceOfResidenceVillage"
								value="village"
								checked={userDetails.placeOfResidence === "village"}
								onChange={handleRadioButtonChange}
								data-user-detail = "placeOfResidence"
							/>
							<label
								className="form-check-label"
								htmlFor="radioPlaceOfResidenceVillage"
							>
								{translation.userDetails.village}
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-place-of-residence"
								id="radioPlaceOfResidenceUrban"
								value="urban"
								checked={userDetails.placeOfResidence === "urban"}
								onChange={handleRadioButtonChange}
								data-user-detail = "placeOfResidence"
							/>
							<label
								className="form-check-label"
								htmlFor="radioPlaceOfResidenceUrban"
							>
								{translation.userDetails.urban}
							</label>
						</div>
					</div>

					{/* Education */}
					<div className="mt-4">
						<div className="sub-question-container">
							<strong>{translation.userDetails.education}</strong>
						</div>
						<div className="form-check radio-spacing mt-2">
							<input
								className="form-check-input"
								type="radio"
								name="radio-education"
								id="radioEducationHighSchool"
								value="highSchool"
								checked={userDetails.education === "highSchool"}
								onChange={handleRadioButtonChange}
								data-user-detail = "education"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEducationHighSchool"
							>
								{translation.userDetails.highSchool}
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-education"
								id="radioEducationDegree"
								value="degree"
								checked={userDetails.education === "degree"}
								onChange={handleRadioButtonChange}
								data-user-detail = "education"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEducationDegree"
							>
								{translation.userDetails.degree}
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-education"
								id="radioEducationPostGraduation"
								value="postGraduation"
								checked={userDetails.education === "postGraduation"}
								onChange={handleRadioButtonChange}
								data-user-detail = "education"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEducationPostGraduation"
							>
								{translation.userDetails.postGraduation}
							</label>
						</div>
					</div>

					{/* Economic Status */}
					<div className="mt-4">
						<div className="sub-question-container">
							<strong>{translation.userDetails.economicStatus}</strong>
						</div>
						<div className="form-check radio-spacing mt-2">
							<input
								className="form-check-input"
								type="radio"
								name="radio-economic-status"
								id="radioEconomicStatusBPL"
								value="bpl"
								checked={userDetails.economicStatus === "bpl"}
								onChange={handleRadioButtonChange}
								data-user-detail = "economicStatus"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEconomicStatusBPL"
							>
								{translation.userDetails.bpl}
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-economic-status"
								id="radioEconomicStatusAPL"
								value="apl"
								checked={userDetails.economicStatus === "apl"}
								onChange={handleRadioButtonChange}
								data-user-detail = "economicStatus"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEconomicStatusAPL"
							>
								{translation.userDetails.apl}
							</label>
						</div>
					</div>

					{/* Employment Status */}
					<div className="mt-4">
						<div className="sub-question-container">
							<strong>{translation.userDetails.employmentStatus}</strong>
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
								data-user-detail = "employmentStatus"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusNotEmployed"
							>
								{translation.userDetails.notEmployed}
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
								data-user-detail = "employmentStatus"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusFullTime"
							>
								{translation.userDetails.fullTime}
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
								data-user-detail = "employmentStatus"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusPartTime"
							>
								{translation.userDetails.partTime}
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
								data-user-detail = "employmentStatus"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusStudent"
							>
								{translation.userDetails.student}
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
								data-user-detail = "employmentStatus"
							/>
							<label
								className="form-check-label"
								htmlFor="radioEmploymentStatusHomeDuties"
							>
								{translation.userDetails.homeDuties}
							</label>
						</div>
					</div>
				</li>
			</ol>

			{error && <AlertBox>{error}</AlertBox>}

			<div className="text-center mt-4 mb-2 p-2 mx-5 d-grid gap-2 d-md-block row d-flex">
				<PageButton
					buttonClass="btn btn-success"
					buttonText={translation.pageNavigation.next}
					handlePageButtonClick={handleNextButtonClick}
				/>
			</div>
		</CardLayout>
	);
}

export default UserDetails;
