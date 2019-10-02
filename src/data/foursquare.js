import axios from 'axios';
import {numberOfVenues} from "../configuration/constants"

const clientId = "3DPN2ENQ0OTEPWMLBM3EFWSIWDPHPIWFPDDR0MV4QEKMDNPP";
const clientSecret = "CZAA1JCYSWHINAKXX45FOGA4U5PNENPRNIHJY14ULBSQEYX0";
const apiVersion = "20190724";
const locale = "en";
const query = "lunch";
const limit = numberOfVenues;

const objectToQueryString = (obj) => "?" + Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');

const sharedQueryString = {
    client_id: clientId,
    client_secret: clientSecret,
    v: apiVersion,
    locale
};

const getVenueDetailsQueryString = () => objectToQueryString(sharedQueryString);

const getVenuesQueryString = (geocode) => objectToQueryString({
    ...sharedQueryString,
    query,
    limit,
    near: geocode
});

const baseUrl = "https://api.foursquare.com/v2";
const venuesEndpoint = "/venues/search";
const venueEndpoint = "/venues/";

export const getVenuesByGeocode = async (geocode) => {
    const res = await axios.get(baseUrl + venuesEndpoint + getVenuesQueryString(geocode));
    const venues = res.data.response.venues;
    return await Promise.all(venues.map(venue => fillVenueDetails(venue)));
};

const fillVenueDetails = async (venue) => {
    const res = await axios.get(baseUrl + venueEndpoint + venue.id + getVenueDetailsQueryString());
    const venueDetails = res.data.response.venue;
    return {...venue, ...venueDetails};
};