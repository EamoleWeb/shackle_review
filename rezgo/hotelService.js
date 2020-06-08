import rezgo from './config';

const getAllHotels = async () => {

  try {
    const response = await rezgo.get('/hotels');

    return response;

  } catch (error) {
    console.log('There is an error retrieving the hotels', error);
  }

};

const setUserHotel = async (user, hotel) => {

  try {

    await rezgo.post(`/users/${user.attributes.sub}/hotels`, {hotel_id: hotel.id});

  } catch (error) {
    console.log(error);

  }

};

const getCurrentUserHotels = async (user) => {

  try {
    const results = await rezgo.get(`/users/${user.sub}/hotels`);

    return results;

  } catch (error) {
    console.log(error);

  }
};

export default { getCurrentUserHotels, getAllHotels, setUserHotel };