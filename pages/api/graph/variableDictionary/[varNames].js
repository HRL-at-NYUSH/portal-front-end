// {
//   ...
//   RACE: {
//     description:
//       'With the exception of the 1970-1990 Puerto Rican censuses, RACE was asked of every person in all years. The concept of race has changed over the more than 150 years represented in the IPUMS. Currently, the Census Bureau and others consider race to be a sociopolitical construct, not a scientific or anthropological one. Many detailed RACE categories consist of national origin groups. Beginning in 2000, the race question changed substantially to allow respondents to report as many races as they felt necessary to describe themselves. In earlier years, only one race response was coded. IPUMS offers several variables describing the answer(s) to the race question. RACE provides the full detail given by the respondent and/or released by the Census Bureau; it is not always historically compatible (see comparability discussion below). Users primarily interested in historical compatibility should consider using RACESING, and should consult the race code relationship page, Relationship between RACE and RACESING codes, for detail about how the RACE and RACESING codes are related. In addition, specific combinations of major races can be discerned using the following bivariate indicators of whether a particular race group was reported: RACAMIND, RACASIAN, RACBLK, RACOTHER, RACPACIS, and RACWHT. RACNUM indicates the total number of major race groups reported for an individual. The information contained in the bivariate indicators and in RACNUM is integrated into the detailed version of RACE. Users primarily interested in historical comparability should consider using RACESING and/or the accompanying variables PROBAI, PROBAPI, PROBBLK, PROBOTH, and PROBWHT. Note that Hispanic origin is assessed through separate questioning (see HISPAN). Prior to 1960, the census enumerator was responsible for categorizing persons and was not specifically instructed to ask the individual his or her race. In 1970 and later years, an individual\'s race was reported by someone in the household or group quarters. In the 1990 U.S. census, the 2000 U.S. and Puerto Rican censuses, the ACS, and the PRCS respondents were specifically asked what race the person "considers himself/herself" to be, although such self-description was more or less operative since 1960. User Note: Race questions were not asked in the Puerto Rican censuses of 1970, 1980, and 1990. They were asked in the 1910 and 1920 Puerto Rican censuses, the 2000-2010 Puerto Rican censuses, and the PRCS.',
//     codes: {
//       1: 'White',
//       2: 'Black/African American/Negro',
//       3: 'American Indian or Alaska Native',
//       4: 'Chinese',
//       5: 'Japanese',
//       6: 'Other Asian or Pacific Islander',
//       7: 'Other race, nec',
//       8: 'Two major races',
//       9: 'Three or more major races',
//     },
//   },
//   ...
// };

// sample api call
// fetch('api/graph/variableDictionary/YEAR,SEX,MARST,FAMUNIT')

export default function handler(req, res) {
  const SERVER_HOST = process.env.SERVER_HOST;
  const { varNames } = req.query;

  console.log('test', varNames);
  if (req.method === 'GET') {
    fetch(
      SERVER_HOST +
        '/variable-dictionary?' +
        new URLSearchParams({
          variables: varNames,
        })
    )
      .then((r) => r.json())
      .then((data) => res.status(200).json(data));
  }
}
