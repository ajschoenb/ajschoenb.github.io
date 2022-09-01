let start = new Date("2022-9-2");

let route = [
{ position: 'Houston, TX', length: 1 },
{ position: 'Little Rock, AR', length: 1 },
{ position: 'Memphis, TN', length: 1 },
{ position: 'Nashville, TN', length: 1 },
{ position: 'Tupelo, MS', length: 1 },
{ position: 'Jackson, MS', length: 1 },
{ position: 'New Orleans, LA', length: 1 },
{ position: 'Birmingham, AL', length: 1 },
{ position: 'Columbus, GA', length: 1 },
{ position: 'Tampa, FL', length: 2 },
{ position: 'Atlanta, GA', length: 1 },
{ position: 'Greenville, SC', length: 1 },
{ position: 'Asheville, NC', length: 1 },
{ position: 'Beckley, WV', length: 1 },
{ position: 'Harrisonburg, VA', length: 1 },
{ position: 'Washington, DC', length: 2 },
{ position: 'Hagerstown, MD', length: 1 },
{ position: 'Wilmington, DE', length: 1 },
{ position: 'Trenton, NJ', length: 1 },
{ position: 'Maplecrest, NY', length: 1 },
{ position: 'Greenwich, CT', length: 1 },
{ position: 'Providence, RI', length: 1 },
{ position: 'Boston, MA', length: 2 },
{ position: 'Conway, NH', length: 1 },
{ position: 'Surry, ME', length: 1 },
{ position: 'Moncton, NB', length: 1 },
{ position: 'Sydney, NS', length: 1 },
{ position: 'Gros Morne, NL, Canada', length: 1 },
{ position: 'Sydney, NS', length: 1 },
{ position: 'Halifax, NS', length: 1 },
{ position: 'Cornwall, PE', length: 1 },
{ position: 'Saint John, NB', length: 1 },
{ position: 'Quebec City, QC', length: 2 },
{ position: 'Georgia, VT', length: 1 },
{ position: 'Montreal, QC', length: 2 },
{ position: 'Toronto, ON', length: 2 },
{ position: 'Detroit, MI', length: 1 },
{ position: 'Pittsburgh, PA', length: 2 },
{ position: 'Columbus, OH', length: 1 },
{ position: 'Indianapolis, Indiana', length: 1 },
{ position: 'Louisville, Kentucky', length: 1 },
{ position: 'St. Louis, MO', length: 1 },
{ position: 'Kansas City, Kansas', length: 1 },
{ position: 'Denver, CO', length: 2 },
{ position: 'Jackson, WY', length: 3 },
{ position: 'Mt Rushmore, SD', length: 1 },
{ position: 'Omaha, Nebraska', length: 1 },
{ position: 'Des Moines, Iowa', length: 1 },
{ position: 'Chicago, IL', length: 1 },
{ position: 'Madison, WI', length: 1 },
{ position: 'Minneapolis, Minnesota', length: 1 },
{ position: 'Winnipeg, Canada', length: 1 },
{ position: 'Moose Jaw, Canada', length: 1 },
{ position: 'Dickinson, ND', length: 1 },
{ position: 'Billings, MT', length: 1 },
{ position: 'Glacier National Park', length: 2 },
{ position: 'Banff, Canada', length: 2 },
{ position: 'Kamloops, Canada', length: 1 },
{ position: 'Vancouver, BC, Canada', length: 2 },
{ position: 'Seattle, WA', length: 2 },
{ position: 'Boise, ID', length: 1 },
{ position: 'Portland, OR', length: 2 },
{ position: 'Redwood National Park, CA', length: 1 },
{ position: 'Lassen Volcanic Park, CA', length: 1 },
{ position: 'Lake Tahoe, CA', length: 2 },
{ position: 'Houston, TX', length: 7 },
{ position: 'Santa Rosa, CA', length: 1 },
{ position: 'San Francisco, CA', length: 1 },
{ position: 'Monterey, CA', length: 1 },
{ position: 'Fresno, CA', length: 3 },
{ position: 'Los Angeles, CA', length: 3 },
{ position: 'Las Vegas, NV', length: 1 },
{ position: 'Alton, UT', length: 2 },
{ position: 'Page, AZ', length: 1 },
{ position: 'Santa Fe, NM', length: 1 },
{ position: 'Oklahoma City, OK', length: 2 },
{ position: 'Houston, TX', length: 0 }
];

const findRouteSrcDst = (date) => {
    var d = new Date(start);
    var src = null;
    for (var i = 0; i < route.length; i++) {
        for (var j = 0; j < route[i].length; j++) {
            if (src) return { src, dst: route[i].position };
            d.setDate(d.getDate() + 1);
            if (d.getYear() === date.getYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()) src = route[i].position;
        }
    }
    return { src: 'Houston, TX', dst: 'Houston, TX' }
};

export { findRouteSrcDst };
