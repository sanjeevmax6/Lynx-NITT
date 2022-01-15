export const API_BASE_URL = 'https://nittapp-spidertesting.cloudns.nz/v1.5/';
export const GET_BASE_URL = 'https://ankursinha03.github.io/nittAppUrl/';

export const API_STUDENT_LOGIN = API_BASE_URL + '/auth/student/login';

export const API_CLUB_LOGIN = API_BASE_URL + '/auth/club/login';

export const API_STUDENT_REGISTER = 'auth/student/register';

export const API_ADD_EVENT = API_BASE_URL + '/api/events/add-events';

export const API_EVENT_LIST = API_BASE_URL + '/api/calendar/eventList';

export const API_ADMIN_EVENT_LIST = API_BASE_URL + 'api/calendar/admin/events';

export const API_ADD_CALENDAR_NOTICE =
  API_BASE_URL + 'api/admin/event/add-events';

export const API_EVENT_BY_ID = API_BASE_URL + '/api/eventById/';

export const API_GET_IMAGE = API_BASE_URL + '/api/image?photo=';

export const API_GET_STUDENT_DETAILS = API_BASE_URL + '/api/student/detail';

export const API_GET_STUDENT_CLUBS = API_BASE_URL + '/api/student/followList';

export const API_GET_STUDENT_INTERESTS =
  API_BASE_URL + '/api/student/interest/list';

export const API_DELETE_STUDENT_INTEREST =
  API_BASE_URL + '/api/student/interest/remove';

export const API_EDIT_PROFILE_STUDENT = API_BASE_URL + 'api/student/edit';

export const API_EDIT_PROFILE_CLUB = API_BASE_URL + 'api/club/edit-clubs';

export const API_CLUB_REGISTER = 'api/club/edit-clubs';

export const API_IS_FOLLOWING = '/api/student/is-following/';

export const API_FOLLOW_TOGGLE = '/api/student/follow/';

export const NO_IMAGE_URL =
  'https://imagizer.imageshack.com/img922/5549/DWQolC.jpg';

export const API_UPCOMING_EVENTS = 'api/student/upcoming-events';

export const API_CIRCULAR_CREATION = '/api/circular';

export const API_SEARCH = '/api/search';

//temporary firebase reg token
export const reg_token = '123abc';

export const API_RESET_PASSWORD_GENERATE_OTP_CLUBS =
  API_BASE_URL + 'auth/forgotpwd/club/sendOtp';

export const API_RESET_PASSWORD_VALIDATE_OTP_CLUBS =
  API_BASE_URL + 'auth/forgotpwd/club/validateOtp';

export const API_RESET_PASSWORD_CLUBS =
  API_BASE_URL + 'auth/forgotpwd/club/newPassword';

export const API_RESET_PASSWORD_VALIDATE_STUDENT =
  API_BASE_URL + 'auth/forgotpwd/student/webmail';

export const API_RESET_PASSWORD_STUDENT =
  API_BASE_URL + 'auth/forgotpwd/student/newPassword';

export const API_CLUB_DATA_BY_ID = API_BASE_URL + 'api/getclub/';

export const API_CLUB_UPCOMING_EVENTS_BY_ID =
  API_BASE_URL + 'api/upcomingClubEvents/';

export const API_CLUB_PAST_EVENTS_BY_ID = API_BASE_URL + 'api/pastClubEvents/';

export const API_TOGGLE_INTERESTED = '/api/student/interest/toggle/';

export const API_STUDENT_INTERESTED_IN_EVENT =
  '/api/student/interest/is-interested/';

export const API_CLUB_LIST = '/api/clubList/club';

export const API_SUBSCRIBE_TOGGLE = '/api/student/subscribe/';

export const API_GET_CLUB_UPCOMING_EVENTS = '/api/upcomingClubEvents/';

export const API_STUDENT_ACTIVITY = 'api/notifications/student';

export const API_CLUB_ACTIVITY = 'api/notifications/club';

export const API_POST_ADD_EVENT = '/api/events/add-events';

export const API_CLUB_EDITEVENT = '/api/events/edit-events/';

export const API_GET_CLUB_PAST_EVENTS = '/api/pastClubEvents/';

export const API_GET_CLUB_DETAILS = '/api/getclub/';

export const API_GET_DELETE_CLUB_EVENTS = '/api/events/delete-events/';
