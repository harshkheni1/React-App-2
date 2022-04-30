const relationShip = [
  { id: 'father', name: 'Father' },
  { id: 'mother', name: 'Mother' },
  { id: 'brother', name: 'Brother' },
  { id: 'uncle', name: 'Uncle' },
  { id: 'son', name: 'Son' },
  { id: 'grandfather', name: 'Grandfather' },
  { id: 'daughter', name: 'Daughter' },
  { id: 'nephew', name: 'Nephew' },
  { id: 'grandmother', name: 'Grandmother' },
  { id: 'niece', name: 'Niece' },
  { id: 'cousin', name: 'Cousin' },
  { id: 'wife', name: 'Wife' },
  { id: 'cousin', name: 'Cousin' },
  { id: 'husband', name: 'Husband' },
].sort((a, b) => {
  return a.name < b.name ? -1 : 1
})

const province = [
  { id: 'Alberta', name: 'Alberta' },
  { id: 'British Columbia', name: 'British Columbia' },
  { id: 'manitoba', name: 'Manitoba' },
  { id: 'New Brunswick', name: 'New Brunswick' },
  { id: 'Newfoundland and Labrador', name: 'Newfoundland and Labrador' },
  { id: 'Northwest Territories', name: 'Northwest Territories' },
  { id: 'Nova Scotia', name: 'Nova Scotia' },
  { id: 'Nunavut', name: 'Nunavut' },
  { id: 'Ontario', name: 'Ontario' },
  { id: 'Prince Edward Island', name: 'Prince Edward Island' },
  { id: 'Cousin', name: 'Cousin' },
  { id: 'Quebec', name: 'Quebec' },
  { id: 'Saskatchewan', name: 'Saskatchewan' },
  { id: 'Yukon', name: 'Yukon' },
].sort((a, b) => {
  return a.name < b.name ? -1 : 1
})

const doctorNames = [
  { id: 'Dr.Harshank', name: 'Dr.Harshank' },
  { id: 'Dr.BijuBhai', name: 'Dr.BijuBhai' },
  { id: 'Dr.Darshit', name: 'Dr.Darshit' },
  { id: 'Dr.Priyanka', name: 'Dr.Priyanka' },
  { id: 'Dr.Sneha', name: 'Dr.Sneha' },
]

const patientGender = [
  { id: 'male', name: 'Male' },
  { id: 'female', name: 'Female' },
  { id: 'intersex', name: 'Intersex' },
]

export { relationShip, province, doctorNames, patientGender }
