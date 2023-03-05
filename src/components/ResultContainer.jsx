function ResultContainer() {
    return (
        <>
            <div>
                <h4 className="text-center">What's next?</h4>
                <p className="result-container">
                    Thanks for completing the questions. Click each section below to view
                    further information and advice.
                </p>
            </div>

            <h5>Moderate Advice</h5>
            <div
                className="accordion"
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
                            Tobacco
                        </button>
                    </h2>

                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <p className="text-success">
                                BASED ON YOUR ANSWERS, YOUR SMOKING IS PUTTING YOU AT MODERATE
                                RISK OF HEALTH AND FINANCIAL PROBLEMS
                            </p>
                            <p>
                                There are no health benefits of tobacco use and no safe level of
                                smoking. If you choose to smoke be aware of the many health
                                problems associated with smoking tobacco such as:
                            </p>
                            <ul>
                                <li>Premature ageing, wrinkling of the skin</li>
                                <li>
                                    Asthma, respiratory infections, chronic obstructive airways
                                    disease
                                </li>
                                <li>High blood pressure</li>
                                <li>Diabetes, and serious complications of diabetes</li>
                                <li>
                                    Miscarriage, premature labour and low birthweight babies
                                </li>
                                <li>Kidney disease</li>
                                <li>Heart disease, stroke, vascular disease</li>
                                <li>Cancers</li>
                                <li>
                                    Respiratory infections, allergies and asthma in the children
                                    of smokers.
                                </li>
                            </ul>
                            <p>
                                If you would like more information about &nbsp;
                                <a
                                    href="#"
                                    className="advice-anchortag"
                                >
                                    Tobacco click here.
                                </a>
                            </p>
                            <p className="text-success">
                                Based on your responses it seems that you may have experienced
                                one or more tobacco related problems in the last 3 months.
                            </p>
                            <p className="text-success">
                                How concerned are you about these problems?
                            </p>
                            <p>
                                If any of these things have happened to you and you are
                                concerned you may want to consider stopping smoking. If you are
                                not sure it can be helpful to list all the good things and the
                                not so good things about your smoking as well as the benefits
                                and costs of stopping. You can find a Cost-Benefit Analysis
                                &nbsp;
                                <a
                                    href="#"
                                    className="advice-anchortag"
                                >
                                    worksheet and other useful tools here
                                </a>
                                <br />
                                By quitting you will find that you will look and feel younger,
                                you will get fitter, your breath, hair and clothes will smell
                                better, your sense of taste and smell will improve, your dental
                                and physical health will improve and you and your family will be
                                at much less risk of serious health problems.
                                <br />A list of the benefits of stopping can be found on the
                                &nbsp;
                                <a
                                    href="#"
                                    className="advice-anchortag"
                                >
                                    Quit Now website
                                </a>
                            </p>
                            <p>
                                If you would like to quit smoking here are some strategies to
                                help you:
                            </p>
                            <ul>
                                <li>Set a target date and stop on that date</li>
                                <li>
                                    Tell a friend or family member that you are going to stop so
                                    that they can support you.
                                </li>
                                <li>
                                    Plan some alternative activities to fill the extra time when
                                    you are not smoking.
                                </li>
                                <li>
                                    Think about situations where you might be tempted to use and
                                    plan to avoid them or plan how you will avoid smoking.
                                </li>
                                <li>
                                    Get more help from the &nbsp;
                                    <a
                                        href="#"
                                        className="advice-anchortag"
                                    >
                                        Quit Now website
                                    </a>
                                </li>
                                <li>
                                    If you would like more help you can download &nbsp;
                                    <a
                                        href="#"
                                        className="advice-anchortag"
                                    >
                                        this free Quit Buddy app
                                    </a>
                                    &nbsp; and/or talk to a health care professional.
                                </li>
                            </ul>
                            <p>
                                To avoid increasing your risk of smoking related problems in the
                                future you can use My Diary to track how often and how much you
                                smoke and how much you spend.
                                <br />
                                You can come back and complete the Check Up again in 3 months
                                time if you would like to see how you are going.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <h5>Test Advice</h5>
            <div
                className="accordion"
                id="accordionExample2"
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
                            data-bs-target="#collapseOne2"
                            aria-expanded="true"
                            aria-controls="collapseOne2"
                        >
                            TEST
                        </button>
                    </h2>

                    <div
                        id="collapseOne2"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResultContainer;