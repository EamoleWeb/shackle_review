import rezgo from './config';

//Gets all the Activities from the inventory
const getAllActivities = async () => {

  try {
    const response = await rezgo.get('/activities');

    return response;

  } catch (error) {
    console.log('There is an error retrieving the activities', error);
  }

};

// GET all available categories
const getInterests = async () => {

  try {
    const response = await rezgo.get('/interests');

    return response.data;

  } catch (error) {
    console.log('There is an error retrieving the interests', error);
  }

};

const getActivityInterests = async () => {

  try {

    const response = await rezgo.get('/interests/activities');

    return response.data;

  } catch (error) {
    console.log('There is an error retrieving the interests activities');
  }
};

const getFoodAndDrinkInterests = async () => {
  try {
    const response = await rezgo.get('/interests/food_and_drink');

    return response.data;

  } catch (error) {
    console.log('There is an error retrieving food and drink interests', error);
  }
};

//Gets all the available tags from the inventory
const getTags = async () => {
  try {
    const response = await rezgo.get('/categories');

    return response;
  } catch (error) {
    console.log('There is an error retrieving categories', error);
  }
};

/*Accepts an array of strings, transforms it to comma-separated string
 and performs tag search. If no tags provided, returns all activities that
 have a tag
 */
const tagSearch = async (tags) => {

  const queryString =  tags != null?tags.map(item => item).join(','):[];

  const params={...{q: queryString}};

  try {
    const response =  await rezgo.get('/activities/search/tag', {params: params});

    return response;
  } catch (error) {
    console.log('There is an error searching by tag', error);
  }
};

/*Accepts an array of strings, transforms it to comma-separated string
 and performs smart search*/
const smartSearch = async function(query) {

  const queryString = query!=null?query.map(item => item).join(','):[];

  const params={...{q: queryString}};

  try {
    const response =  await rezgo.get('/activities/search/smart', {params: params});

    return response;
  } catch (error) {
    console.log('There is an error performing a smart search', error);
  }
};

//Gets all activities within a radius (miles) around a given geolocation
/*  TODO: Perhaps miles should be converted to accept meters
          like the hotels geolocation search
*/
const geolocationSearch = async (geolocation, radius) => {

  const {
    latitude,
    longitude
  } = geolocation.coords;

  const params={...{q: `${latitude},${longitude},${radius}`}};

  try {
    const response = await rezgo.get('/activities/search/geo', {params: params});

    return response;
  } catch (error) {
    console.log('There is an error performing a geolocation search', error);
  }
};

//Gets and item by its unique id
const getItemByID = async (uid) => {

  const params = {...{q: uid}};

  try {
    const response = await rezgo.get(`/activities/${uid}`, {params: params});

    return response;
  } catch (error) {
    console.log(error);
  }

};

const getAvaiabilityByUIDandDate = async (uid, date, adult_num = 0, child_num = 0, senior_num = 0) => {

  const params ={...{d: date}, ...{adult_num: adult_num, child_num: child_num, senior_num: senior_num}};

  try {
    const response = await rezgo.get(`/activities/${uid}/availability`, {params: params});

    return response;

  } catch (error) {
    console.log('There is an error retrieving the availability by uid', error);
  }
};

//Gets all the available items on a specific date. Date format: YYYY-MM-DD
const getByDate = async (date) => {
  const params = {...{q: date}};

  try {
    const response = await rezgo.get('/activities/search/date', {params: params});

    return response;

  } catch (error) {
    console.log('There is an error searching activities by date', error);
  }

};

//Gets available items by com
const getByCom = async (com, date = null) => {
  try {

    const params = {...{date: date}};

    const response = await rezgo.get(`/activities/group/${com}`, {params: params});

    return response;
  } catch (error) {
    console.log('There is an error retrieving activities by com', error);
  }
};

const getBookingsPrevious = async (email) => {

  const params ={...{q: email}};

  try {

    const response = await rezgo.get('/bookings/search/previous', {params: params});

    return response;

  } catch (error) {
    console.log('There is an error retrieving previous bookings', error);
  }
};

const getBookingsAll = async (email) => {

  const params ={...{q: email}};

  try {

    const response = await rezgo.get('/bookings/search/all', {params: params});

    //console.log('Service ', response);

    return response;

  } catch (error) {
    console.log('There is an error searching for all bookings', error);
  }
};

const getBookingsUpcoming = async (email) => {

  const params ={...{q: email}};

  try {

    const response = await rezgo.get('/bookings/search/upcoming', {params: params});

    return response;
  } catch (error) {
    console.log('There is an error retrieving upcoming bookings', error);
  }
};

const getBookingsByEmail = async (email, date) => {
  const params ={...{q: email, d: date}};

  try {

    const response = await rezgo.get('/bookings/search', {params: params});

    return response;

  } catch (error) {
    console.log('There is an error searching for bookings', error);
  }
};

export default {
  getBookingsAll,
  getBookingsPrevious,
  getBookingsUpcoming,
  getBookingsByEmail,
  getAvaiabilityByUIDandDate,
  getInterests,
  getActivityInterests,
  getFoodAndDrinkInterests,
  getTags,
  smartSearch,
  tagSearch,
  getAllActivities,
  geolocationSearch,
  getItemByID,
  getByDate,
  getByCom
};
