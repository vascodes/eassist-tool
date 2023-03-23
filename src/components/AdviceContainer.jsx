import PageButton from "./PageButton";

// TODO: Dynamically populate advice.
function ResultContainer({ allPages, handlePage }) {
	
	function handleNextButtonClick() {
		handlePage(allPages.scores);
	}

	function handlePrevButtonClick() {
		handlePage(allPages.questions);
	}

	return (
		<>
			<div>
				<h4 className="text-center">What's next?</h4>
				<p className="result-container">
					Thanks for completing the questions. Click each section below to view further
					information and advice.
				</p>
			</div>

			{/* TODO: Make Risk Level dynamic. */}
			<h5>Moderate Advice</h5>
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
							Tobacco
						</button>
					</h2>

					<div
						id="collapseOne"
						className="accordion-collapse collapse"
						aria-labelledby="headingOne"
						data-bs-parent="#accordionExample"
					>
						{/* TODO: Make advice dynamic */}
						<div className="accordion-body">
							<p>
								BASED ON YOUR ANSWERS, YOUR SMOKING IS PUTTING YOU AT MODERATE RISK
								OF HEALTH AND FINANCIAL PROBLEMS
								<br />
								There are no health benefits of tobacco use and no safe level of
								smoking. If you choose to smoke be aware of the many health problems
								associated with smoking tobacco such as:
							</p>
							<ul>
								<li>Premature ageing, wrinkling of the skin</li>
								<li>
									Asthma, respiratory infections, chronic obstructive airways
									disease
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
								Based on your responses it seems that you may have experienced one
								or more tobacco related problems in the last 3 months.
							</p>
							<p>
								How concerned are you about these problems?
								<br />
								If any of these things have happened to you and you are concerned
								you may want to consider stopping smoking. If you are not sure it
								can be helpful to list all the good things and the not so good
								things about your smoking as well as the benefits and costs of
								stopping. You can find a Cost-Benefit Analysis{" "}
								<a href="http://smartrecoveryaustralia.com.au/resources/smart-worksheets/">
									worksheet and other useful tools here
								</a>
								<br />
								By quitting you will find that you will look and feel younger, you
								will get fitter, your breath, hair and clothes will smell better,
								your sense of taste and smell will improve, your dental and physical
								health will improve and you and your family will be at much less
								risk of serious health problems.
								<br />A list of the benefits of stopping can be found on the{" "}
								<a href="http://www.quitnow.gov.au/">Quit Now website</a>
							</p>
							<p>
								If you would like to quit smoking here are some strategies to help
								you:
							</p>
							<ul>
								<li>Set a target date and stop on that date</li>
								<li>
									Tell a friend or family member that you are going to stop so
									that they can support you.
								</li>
								<li>
									Plan some alternative activities to fill the extra time when you
									are not smoking.
								</li>
								<li>
									Think about situations where you might be tempted to use and
									plan to avoid them or plan how you will avoid smoking.
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
								To avoid increasing your risk of smoking related problems in the
								future you can use My Diary to track how often and how much you
								smoke and how much you spend.
								<br />
								You can come back and complete the Check Up again in 3 months time
								if you would like to see how you are going.
							</p>
						</div>
					</div>
				</div>
			</div>

			<h5>Referral Advice</h5>
			<div
				className="accordion"
				id="accordionReferralExample"
			>
				<div className="accordion-item">
					<h2
						className="accordion-header"
						id="headingTwo"
					>
						<button
							className="accordion-button collapsed"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseTwo"
							aria-expanded="true"
							aria-controls="collapseTwo"
						>
							{/* TODO: Make Substance name dynamic */}
							Alcohol
						</button>
					</h2>

					<div
						id="collapseTwo"
						className="accordion-collapse collapse"
						aria-labelledby="headingTwo"
						data-bs-parent="#accordionReferralExample"
					>
						{/* TODO: Make advice dynamic */}
						<div className="accordion-body">
							<p>
								YOU ARE AT <strong>HIGH RISK</strong> OF EXPERIENCING HEALTH,
								SOCIAL, FINANCIAL, LEGAL AND RELATIONSHIP PROBLEMS BASED ON YOUR
								CURRENT PATTERN OF ALCOHOL USE
								<br />
								Alcohol use can be associated with health, social, financial and
								legal problems such as:
							</p>
							<ul>
								<li>Accidents and injury</li>
								<li>Financial and work problems</li>
								<li>Aggressive and violent behaviour</li>
								<li>Drink driving charges</li>
								<li>Relationship problems</li>
								<li>Premature ageing</li>
								<li>Reduced sexual performance</li>
								<li>Difficulty remembering things and solving problems</li>
								<li>High blood pressure</li>
								<li>Anxiety and depression</li>
								<li>Digestive problems, ulcers</li>
								<li>
									For pregnant women, risk of Foetal Alcohol Spectrum Disorder.
								</li>
							</ul>
							<p>
								In the long term alcohol use may be associated with, muscle and
								nerve damage, permanent brain injury, stroke, heart disease, kidney
								disease, pancreatitis, liver disease, and cancers.
							</p>
							<p>
								The best way to reduce your risk is to cut down or stop drinking
								alcohol. People in the high risk range often show signs of
								dependence on alcohol, meaning if they stop or significantly reduce
								their alcohol intake they show physical and psychological signs of
								alcohol withdrawal. It is strongly advised that you seek medical
								advice when planning to reduce or stop your alcohol use. If you
								would like more information about{" "}
								<a href="https://assistplus.com.au/drug-information/australian-alcohol-guidelines/">
									alcohol click here.
								</a>
							</p>
							<p>
								Based on your responses it seems that you have experienced one or
								more problems related to your alcohol use.
							</p>
							<p>
								How concerned are you about these problems? If you are unsure,
								answer the following questions:
							</p>
							<ul>
								<li>
									Do you think you need help to cut down or stop drinking alcohol?
								</li>
								<li>
									Do you experience physical withdrawal symptoms such as anxiety,
									nausea, or tremor when you haven’t had any alcohol?
								</li>
								<li>
									Have you been unable to reduce or stop drinking alcohol even
									though your health, family, work, financial or legal problems
									have continued or got worse?
								</li>
								<li>
									Do you have health or psychological problems that may be made
									worse by drinking alcohol?
								</li>
							</ul>
							<p>
								If you answered yes to any of these questions we strongly recommend
								that you see a health care professional for further assessment and
								assistance.
								<br />
								There are other services and resources that can help you:
							</p>
							<ul>
								<li>
									You can call ADIS – the Alcohol and Drug Information Service for
									advice and referrals: <a href="tel:1800250015">1800 250 015</a>
								</li>
								<li>
									If you are aged between 12 and 25 you can call Headspace for
									advice and referrals
								</li>
								<li>
									<a href="http://smartrecoveryaustralia.com.au/">
										SMART Recovery
									</a>{" "}
									is a free group program assisting people with any problematic
									behaviours.
								</li>
							</ul>
							<p>
								What are the low risk drinking guidelines?
								<br />
								Australian experts recommend that to reduce the risk from
								alcohol-related disease or injury, healthy adults (who are not
								pregnant or breastfeeding), should drink no more than 10 standard
								drinks a week 2 standard drinks per day and no more than 4 standard
								drinks on any one day. The less you drink, the lower your risk of
								harm from alcohol.
								<br />
								An Australian standard drink is a drink containing 10g of alcohol
							</p>
							<p>
								<img
									src="https://eassist.assistportal.com.au/assets/images/shared/feedback/alcohol.png"
									alt=""
								/>
							</p>
							<p>
								Standard drinks guide and images courtesy of the Australian
								Government Department of Health.
							</p>
							<p>
								If you are under 18 experts say that not drinking is the safest
								option.
								<br />
								If you are pregnant or breastfeeding it is safest for you and your
								baby not to drink alcohol.
								<br />
								By keeping within these low risk guidelines you are likely to look
								and feel better, your sleep and moods may improve, you may find
								improvements in your relationships with family and friends and you
								will be less likely to experience alcohol related problems.
								<br />
								In the long term your risk of weight gain, anxiety and depression,
								high blood pressure, stroke, heart disease, kidney disease, liver
								disease, and cancers will be reduced.
							</p>
							<p>
								To help reduce your risk of alcohol related problems in the future
								you can use My Diary to track how often and how much you drink, and
								how much you spend.
								<br />
								You can come back and complete the Check Up again in 3 months time
								if you would like to see how you are going.
							</p>
							<p>
								Make sure you know what to do in a crisis
								<br />
								If someone overdoses or has an adverse reaction while drinking
								alcohol, in Australia
							</p>
							<p>
								<a href="tel:000">Call Triple Zero (000)</a>
							</p>
							<p>
								It is very important that they receive professional help as soon as
								possible. A quick response can save their life so don’t delay.
							</p>
						</div>
					</div>
				</div>
			</div>

			<br />

			{/* Next Button */}
			<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
				<PageButton
					buttonText={"Next >"}
					buttonClass="btn btn-success"
					handlePageButtonClick={handleNextButtonClick}
				/>
			</div>

			{/* Previous Button */}
			<div className="text-center mt-4 mx-5 d-grid gap-2 d-md-block row d-flex">
				<PageButton
					buttonText={"< Changed my mind"}
					buttonClass="btn btn-outline-success"
					handlePageButtonClick={handlePrevButtonClick}
				/>
			</div>
		</>
	);
}

export default ResultContainer;
