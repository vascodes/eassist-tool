function Accordion({ title, children }) {
	return (
		<div
			className="accordion mb-4"
			id="accordionExample"
		>
			<div className="accordion-item">
				<h2
					className="accordion-header"
					id="headingOne"
				>
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapseOne"
						aria-expanded="true"
						aria-controls="collapseOne"
					>
						{/* TODO: Make Substance name dynamic */}
						{title}
					</button>
				</h2>

				<div
					id="collapseOne"
					className="accordion-collapse collapse"
					aria-labelledby="headingOne"
					data-bs-parent="#accordionExample"
				>
					{/* TODO: Make advice dynamic */}					
					<div className="accordion-body">{children}</div>

					{/* <div className="accordion-body">
						<p>
							BASED ON YOUR ANSWERS, YOUR SMOKING IS PUTTING YOU AT MODERATE RISK OF
							HEALTH AND FINANCIAL PROBLEMS
							<br />
							There are no health benefits of tobacco use and no safe level of
							smoking. If you choose to smoke be aware of the many health problems
							associated with smoking tobacco such as:
						</p>
						<ul>
							<li>Premature ageing, wrinkling of the skin</li>
							<li>
								Asthma, respiratory infections, chronic obstructive airways disease
							</li>
							<li>High blood pressure</li>
							<li>Diabetes, and serious complications of diabetes</li>
							<li>Miscarriage, premature labour and low birthweight babies</li>
							<li>Kidney disease</li>
							<li>Heart disease, stroke, vascular disease</li>
							<li>Cancers</li>
							<li>
								Respiratory infections, allergies and asthma in the children of
								smokers.
							</li>
						</ul>
						<p>
							If you would like more information about{" "}
							<a href="https://assistplus.com.au/drug-information/nicotine/">
								Tobacco click here.
							</a>
						</p>
						<p>
							Based on your responses it seems that you may have experienced one or
							more tobacco related problems in the last 3 months.
						</p>
						<p>
							How concerned are you about these problems?
							<br />
							If any of these things have happened to you and you are concerned you
							may want to consider stopping smoking. If you are not sure it can be
							helpful to list all the good things and the not so good things about
							your smoking as well as the benefits and costs of stopping. You can find
							a Cost-Benefit Analysis{" "}
							<a href="http://smartrecoveryaustralia.com.au/resources/smart-worksheets/">
								worksheet and other useful tools here
							</a>
							<br />
							By quitting you will find that you will look and feel younger, you will
							get fitter, your breath, hair and clothes will smell better, your sense
							of taste and smell will improve, your dental and physical health will
							improve and you and your family will be at much less risk of serious
							health problems.
							<br />A list of the benefits of stopping can be found on the{" "}
							<a href="http://www.quitnow.gov.au/">Quit Now website</a>
						</p>
						<p>
							If you would like to quit smoking here are some strategies to help you:
						</p>
						<ul>
							<li>Set a target date and stop on that date</li>
							<li>
								Tell a friend or family member that you are going to stop so that
								they can support you.
							</li>
							<li>
								Plan some alternative activities to fill the extra time when you are
								not smoking.
							</li>
							<li>
								Think about situations where you might be tempted to use and plan to
								avoid them or plan how you will avoid smoking.
							</li>
							<li>
								Get more help from the{" "}
								<a href="https://www.health.gov.au/health-topics/smoking-and-tobacco/how-to-quit-smoking?utm_source=quitnow.gov.au&utm_medium=redirect&utm_campaign=digital_transformation">
									the Quit Now website
								</a>
							</li>
							<li>
								If you would like more help you can download{" "}
								<a href="https://www.health.gov.au/resources/apps-and-tools/my-quitbuddy-app">
									this free Quit Buddy app
								</a>{" "}
								and/or talk to a health care professional.
							</li>
						</ul>
						<p>
							To avoid increasing your risk of smoking related problems in the future
							you can use My Diary to track how often and how much you smoke and how
							much you spend.
							<br />
							You can come back and complete the Check Up again in 3 months time if
							you would like to see how you are going.
						</p>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default Accordion;
