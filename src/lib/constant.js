export default {
  APPOINTMENT_STATUS: {
    PENDING: 0, // 0 Pending when patient books patient
    CONFIRMED: 1, // 1 Appointment confirmed when doctor books patient
    REJECTED: 2,
    CANCELLED: 3,
    COMPLETED: 4,
  },
  USER_STATUS: {
    PENDING: 'Pending', // 0 Pending when patient books patient
    CONFIRMED: 'Confirmed', // 1 Appointment confirmed when doctor books patient
    REJECTED: 'Rejected',
    CANCELLED: 'Cancelled',
    COMPLETED: 'Completed',
  },
  USER_GENDER: {
    MALE: 'Male',
    FEMALE: 'Female',
    OTHERS: 'Others',
  },
  GENDER_STATUS: {
    MALE: 'M',
    FEMALE: 'F',
  },
  ROLES: {
    USER: 'PATIENT',
    SUPER_ADMIN: 'SUPERUSER',
    ADMIN: 'ADMIN',
    DOCTOR: 'DOCTOR',
    STAFF: 'STAFF',
    ALL: ['GUEST', 'SUPER', 'ADMIN'],
  },
}
