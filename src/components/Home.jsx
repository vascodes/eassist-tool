import PageButton from "./PageButton";

function Home({allPages, handlePage}) {
	return (
		<>
			<ol className="list-group list-group-flush">
				<li className="list-group-item">
					<div>
						<div className="sub-question-container">What is your gender?</div>
						<div className="form-check radio-spacing mt-2">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label
								className="form-check-label"
								htmlFor="flexRadioDefault1"
							>
								Male
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
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
								name="flexRadioDefault"
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

					<div>
						<div className="sub-question-container">What is your age?</div>
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

					<div>
						<div className="sub-question-container">
							How are you mainly employed at the moment?
						</div>
						<div className="form-check radio-spacing mt-2">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label
								className="form-check-label"
								htmlFor="flexRadioDefault1"
							>
								Not employed
							</label>
						</div>
						<div className="form-check radio-spacing">
							<input
								className="form-check-input"
								type="radio"
								name="flexRadioDefault"
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
								name="flexRadioDefault"
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
								name="flexRadioDefault"
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
								name="flexRadioDefault"
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
		</>
	);
}

export default Home;
