import PageButton from "../ui/PageButton";
import CardLayout from "../layouts/CardLayout";

// TODO: Save Input data
function UserDetails({ allPages, handlePage }) {
	return (
		<CardLayout>
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
								id="radio-gender"
							/>
							<label
								className="form-check-label"
								htmlFor="radio-gender"
							>
								Male
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-gender"
								id="flexRadioDefault2"
							/>
							<label
								className="form-check-label"
								htmlFor="flexRadioDefault2"
							>
								Female
							</label>
						</div>
						<div className="form-check radio-spacing mb-3">
							<input
								className="form-check-input"
								type="radio"
								name="radio-gender"
								id="flexRadioDefault3"
							/>
							<label
								className="form-check-label"
								htmlFor="flexRadioDefault3"
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
								id="formGroupExampleInput"
								min="10"
								max="100"
							/>
							<label htmlFor="formGroupExampleInput"></label>
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
								id="radio-employment-status"
							/>
							<label
								className="form-check-label"
								htmlFor="radio-employment-status"
							>
								Not employed
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-employment-status"
								id="flexRadioDefault2"
							/>
							<label
								className="form-check-label"
								htmlFor="flexRadioDefault2"
							>
								Full time
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-employment-status"
								id="flexRadioDefault3"
							/>
							<label
								className="form-check-label"
								htmlFor="flexRadioDefault3"
							>
								Part time/casual
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-employment-status"
								id="flexRadioDefault4"
							/>
							<label
								className="form-check-label"
								htmlFor="flexRadioDefault4"
							>
								Student
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="radio-employment-status"
								id="flexRadioDefault5"
							/>
							<label
								className="form-check-label"
								htmlFor="flexRadioDefault5"
							>
								Home duties
							</label>
						</div>
					</div>
				</li>
			</ol>

			<div className="text-center mt-4 mb-2 p-2 mx-5 d-grid gap-2 d-md-block row d-flex">
				<PageButton
					buttonClass="btn btn-success"
					buttonText="Next >"
					handlePageButtonClick={() => handlePage(allPages.questions)}
				/>
			</div>
		</CardLayout>
	);
}

export default UserDetails;
