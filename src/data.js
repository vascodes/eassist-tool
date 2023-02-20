export const data = {
	questions: {
		question1: {
			id: "q1",
			text: "In your life, which of the following substances have you ever used (non-medical use only)?",
			substances: [
				{
					id: "tobacco",
					name: "Tobacco products",
					examples: "cigarettes, chewing tobacco, cigars",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
				{
					id: "alcohol",
					name: "Alcoholic beverages",
					examples: "beer, wine, spirits",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
				{
					id: "cannabis",
					name: "Cannabis",
					examples: "marijuana, pot, grass, hash",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
				{
					id: "cocaine",
					name: "Cocaine",
					examples: "coke, crack",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
				{
					id: "amphetamine",
					name: "Amphetamine-type stimulants",
					examples: "speed, meth, ecstasy",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
				{
					id: "inhalants",
					name: "Inhalants",
					examples: "nitrous, glue, petrol, paint thinner",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
				{
					id: "sedatives",
					name: "Sedatives or sleeping pills",
					examples: "diazepam, alprazolam, flunitrazepam, midazolam",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
				{
					id: "hallucinogens",
					name: "Hallucinogens",
					examples: "LSD, acid, mushrooms, trips, ketamine",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
				{
					id: "opioids",
					name: "Opioids",
					examples: "heroin, morphine, methadone, buprenorphine, codeine",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
				{
					id: "other",
					name: "Other",
					examples: "",
					options: [
						{
							id: 1,
							text: "No",
							score: 0,
						},
						{
							id: 2,
							text: "Yes",
							score: 0,
						},
					],
				},
			],
		},
		question2: {
			id: "q2",
			text: "In the past three months, how often have you used the substances you mentioned (first drug, second drug, etc)?",
			substances: [
				{
					id: "tobacco",
					name: "Tobacco products",
					examples: "cigarettes, chewing tobacco, cigars",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "alcohol",
					name: "Alcoholic beverages",
					examples: "beer, wine, spirits",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "cannabis",
					name: "Cannabis",
					examples: "marijuana, pot, grass, hash",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "cocaine",
					name: "Cocaine",
					examples: "coke, crack",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "amphetamine",
					name: "Amphetamine-type stimulants",
					examples: "speed, meth, ecstasy",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "inhalants",
					name: "Inhalants",
					examples: "nitrous, glue, petrol, paint thinner",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "sedatives",
					name: "Sedatives or sleeping pills",
					examples: "diazepam, alprazolam, flunitrazepam, midazolam",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "hallucinogens",
					name: "Hallucinogens",
					examples: "LSD, acid, mushrooms, trips, ketamine",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "opioids",
					name: "Opioids",
					examples: "heroin, morphine, methadone, buprenorphine, codeine",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "other",
					name: "Other",
					examples: "",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 2,
						},
						{
							id: 3,
							text: "Monthly",
							score: 3,
						},
						{
							id: 4,
							text: "Weekly",
							score: 4,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
			],
		},
		question3: {
			id: "q3",
			text: "During the past three months, how often have you had a strong desire or urge to use (first drug, second drug, etc)?",
			substances: [
				{
					id: "tobacco",
					name: "Tobacco products",
					examples: "cigarettes, chewing tobacco, cigars",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "alcohol",
					name: "Alcoholic beverages",
					examples: "beer, wine, spirits",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "cannabis",
					name: "Cannabis",
					examples: "marijuana, pot, grass, hash",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "cocaine",
					name: "Cocaine",
					examples: "coke, crack",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "amphetamine",
					name: "Amphetamine-type stimulants",
					examples: "speed, meth, ecstasy",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "inhalants",
					name: "Inhalants",
					examples: "nitrous, glue, petrol, paint thinner",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "sedatives",
					name: "Sedatives or sleeping pills",
					examples: "diazepam, alprazolam, flunitrazepam, midazolam",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "hallucinogens",
					name: "Hallucinogens",
					examples: "LSD, acid, mushrooms, trips, ketamine",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "opioids",
					name: "Opioids",
					examples: "heroin, morphine, methadone, buprenorphine, codeine",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
				{
					id: "other",
					name: "Other",
					examples: "",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 3,
						},
						{
							id: 3,
							text: "Monthly",
							score: 4,
						},
						{
							id: 4,
							text: "Weekly",
							score: 5,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 6,
						},
					],
				},
			],
		},
		question4: {
			id: "q4",
			text: "During the past three months, how often has your use of (first drug, second drug, etc) led to health, social, legal or financial problems?",
			substances: [
				{
					id: "tobacco",
					name: "Tobacco products",
					examples: "cigarettes, chewing tobacco, cigars",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
				{
					id: "alcohol",
					name: "Alcoholic beverages",
					examples: "beer, wine, spirits",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
				{
					id: "cannabis",
					name: "Cannabis",
					examples: "marijuana, pot, grass, hash",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
				{
					id: "cocaine",
					name: "Cocaine",
					examples: "coke, crack",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
				{
					id: "amphetamine",
					name: "Amphetamine-type stimulants",
					examples: "speed, meth, ecstasy",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
				{
					id: "inhalants",
					name: "Inhalants",
					examples: "nitrous, glue, petrol, paint thinner",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
				{
					id: "sedatives",
					name: "Sedatives or sleeping pills",
					examples: "diazepam, alprazolam, flunitrazepam, midazolam",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
				{
					id: "hallucinogens",
					name: "Hallucinogens",
					examples: "LSD, acid, mushrooms, trips, ketamine",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
				{
					id: "opioids",
					name: "Opioids",
					examples: "heroin, morphine, methadone, buprenorphine, codeine",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
				{
					id: "other",
					name: "Other",
					examples: "",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
			],
		},
		question5: {
			id: "q5",
			text: "During the past three months, how often have you failed to do what was normally expected of you because of your use of (first drug, second drug, etc)?",
			substances: [
				{
					id: "tobacco",
					name: "Tobacco products",
					examples: "cigarettes, chewing tobacco, cigars",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 5,
						},
						{
							id: 3,
							text: "Monthly",
							score: 6,
						},
						{
							id: 4,
							text: "Weekly",
							score: 7,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 8,
						},
					],
				},
				{
					id: "alcohol",
					name: "Alcoholic beverages",
					examples: "beer, wine, spirits",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 5,
						},
						{
							id: 3,
							text: "Monthly",
							score: 6,
						},
						{
							id: 4,
							text: "Weekly",
							score: 7,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 8,
						},
					],
				},
				{
					id: "cannabis",
					name: "Cannabis",
					examples: "marijuana, pot, grass, hash",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 5,
						},
						{
							id: 3,
							text: "Monthly",
							score: 6,
						},
						{
							id: 4,
							text: "Weekly",
							score: 7,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 8,
						},
					],
				},
				{
					id: "cocaine",
					name: "Cocaine",
					examples: "coke, crack",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 5,
						},
						{
							id: 3,
							text: "Monthly",
							score: 6,
						},
						{
							id: 4,
							text: "Weekly",
							score: 7,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 8,
						},
					],
				},
				{
					id: "amphetamine",
					name: "Amphetamine-type stimulants",
					examples: "speed, meth, ecstasy",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 5,
						},
						{
							id: 3,
							text: "Monthly",
							score: 6,
						},
						{
							id: 4,
							text: "Weekly",
							score: 7,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 8,
						},
					],
				},
				{
					id: "inhalants",
					name: "Inhalants",
					examples: "nitrous, glue, petrol, paint thinner",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 5,
						},
						{
							id: 3,
							text: "Monthly",
							score: 6,
						},
						{
							id: 4,
							text: "Weekly",
							score: 7,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 8,
						},
					],
				},
				{
					id: "sedatives",
					name: "Sedatives or sleeping pills",
					examples: "diazepam, alprazolam, flunitrazepam, midazolam",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 5,
						},
						{
							id: 3,
							text: "Monthly",
							score: 6,
						},
						{
							id: 4,
							text: "Weekly",
							score: 7,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 8,
						},
					],
				},
				{
					id: "hallucinogens",
					name: "Hallucinogens",
					examples: "LSD, acid, mushrooms, trips, ketamine",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 5,
						},
						{
							id: 3,
							text: "Monthly",
							score: 6,
						},
						{
							id: 4,
							text: "Weekly",
							score: 7,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 8,
						},
					],
				},
				{
					id: "opioids",
					name: "Opioids",
					examples: "heroin, morphine, methadone, buprenorphine, codeine",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 5,
						},
						{
							id: 3,
							text: "Monthly",
							score: 6,
						},
						{
							id: 4,
							text: "Weekly",
							score: 7,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 8,
						},
					],
				},
				{
					id: "other",
					name: "Other",
					examples: "",
					options: [
						{
							id: 1,
							text: "Never",
							score: 0,
						},
						{
							id: 2,
							text: "Once or twice",
							score: 4,
						},
						{
							id: 3,
							text: "Monthly",
							score: 5,
						},
						{
							id: 4,
							text: "Weekly",
							score: 6,
						},
						{
							id: 5,
							text: "Daily or almost daily",
							score: 7,
						},
					],
				},
			],
		},
		question6: {
			id: "q6",
			text: "Has a friend or relative or anyone else ever expressed concern about your use of (first drug, second drug, etc)?",
			substances: [
				{
					id: "tobacco",
					name: "Tobacco products",
					examples: "cigarettes, chewing tobacco, cigars",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "alcohol",
					name: "Alcoholic beverages",
					examples: "beer, wine, spirits",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "cannabis",
					name: "Cannabis",
					examples: "marijuana, pot, grass, hash",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "cocaine",
					name: "Cocaine",
					examples: "coke, crack",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "amphetamine",
					name: "Amphetamine-type stimulants",
					examples: "speed, meth, ecstasy",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "inhalants",
					name: "Inhalants",
					examples: "nitrous, glue, petrol, paint thinner",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "sedatives",
					name: "Sedatives or sleeping pills",
					examples: "diazepam, alprazolam, flunitrazepam, midazolam",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "hallucinogens",
					name: "Hallucinogens",
					examples: "LSD, acid, mushrooms, trips, ketamine",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "opioids",
					name: "Opioids",
					examples: "heroin, morphine, methadone, buprenorphine, codeine",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "other",
					name: "Other",
					examples: "",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
			],
		},
		question7: {
			id: "q7",
			text: "Have you ever tried to cut down on using (first drug, second drug, etc) but failed?",
			substances: [
				{
					id: "tobacco",
					name: "Tobacco products",
					examples: "cigarettes, chewing tobacco, cigars",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "alcohol",
					name: "Alcoholic beverages",
					examples: "beer, wine, spirits",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "cannabis",
					name: "Cannabis",
					examples: "marijuana, pot, grass, hash",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "cocaine",
					name: "Cocaine",
					examples: "coke, crack",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "amphetamine",
					name: "Amphetamine-type stimulants",
					examples: "speed, meth, ecstasy",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "inhalants",
					name: "Inhalants",
					examples: "nitrous, glue, petrol, paint thinner",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "sedatives",
					name: "Sedatives or sleeping pills",
					examples: "diazepam, alprazolam, flunitrazepam, midazolam",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "hallucinogens",
					name: "Hallucinogens",
					examples: "LSD, acid, mushrooms, trips, ketamine",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "opioids",
					name: "Opioids",
					examples: "heroin, morphine, methadone, buprenorphine, codeine",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
				{
					id: "other",
					name: "Other",
					examples: "",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 6,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 3,
						},
					],
				},
			],
		},
		question8: {
			id: "q8",
			text: "Have you ever used any drug by injection (non-medical use only)?",
			substances: [
				{
					id: "injection",
					name: "",
					examples: "",
					options: [
						{
							id: 1,
							text: "No, Never",
							score: 0,
						},
						{
							id: 2,
							text: "Yes, in the past 3 months",
							score: 0,
						},
						{
							id: 3,
							text: "Yes, but not in the past 3 months",
							score: 0,
						},
					],
				},
			],
		},
	},
	substanceRiskLevels: {
		tobacco: {
			id: "tobacco",
			name: "Tobacco Products",
			criterias: ["1-3 Lower", "4-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 3,
			},
			moderate: {
				text: "Moderate",
				min: 4,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
		alcohol: {
			id: "alcohol",
			name: "Alcoholic beverages",
			criterias: ["0-10 Lower", "11-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 10,
			},
			moderate: {
				text: "Moderate",
				min: 11,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
		cannabis: {
			id: "cannabis",
			name: "Cannabis",
			criterias: ["0-3 Lower", "4-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 3,
			},
			moderate: {
				text: "Moderate",
				min: 4,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
		cocaine: {
			id: "cocaine",
			name: "Cocaine",
			criterias: ["0-3 Lower", "4-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 3,
			},
			moderate: {
				text: "Moderate",
				min: 4,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
		amphetamine: {
			id: "amphetamine",
			name: "Amphetamine-type stimulants",
			criterias: ["0-3 Lower", "4-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 3,
			},
			moderate: {
				text: "Moderate",
				min: 4,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
		inhalants: {
			id: "inhalants",
			name: "Inhalants",
			criterias: ["0-3 Lower", "4-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 3,
			},
			moderate: {
				text: "Moderate",
				min: 4,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
		sedatives: {
			id: "sedatives",
			name: "Sedatives or sleeping pills",
			criterias: ["0-3 Lower", "4-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 3,
			},
			moderate: {
				text: "Moderate",
				min: 4,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
		hallucinogens: {
			id: "hallucinogens",
			name: "Hallucinogens",
			criterias: ["0-3 Lower", "4-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 3,
			},
			moderate: {
				text: "Moderate",
				min: 4,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
		opioids: {
			id: "opioids",
			name: "Opioids",
			criterias: ["0-3 Lower", "4-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 3,
			},
			moderate: {
				text: "Moderate",
				min: 4,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
		other: {
			id: "other",
			name: "Other",
			criterias: ["0-3 Lower", "4-26 Moderate", "27+ High"],
			lower: {
				text: "Lower",
				min: 0,
				max: 3,
			},
			moderate: {
				text: "Moderate",
				min: 4,
				max: 26,
			},
			high: {
				text: "High",
				min: 27,
				max: null,
			},
		},
	},
	scoreMeaning: {
		lower: "You are at lower risk of health and other problems from your current pattern of use.",
		moderate:
			"You are at moderate risk of health and other problems from your current pattern of substance use.",
		high: "You are at high risk of experiencing severe problems (health, social, financial, legal, relationship) as a result of your current pattern of use and are likely to be dependent.",
	},
};
