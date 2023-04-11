export interface IUser {
  "_id": string;
  "gender": string,
  "name": {
    "first": string;
    "last": string;
  },
  "email": string;
  "phone": string;
  "address": string;
  "country": string;
  "registered": string;
  "about": string;
  "age": number,
  "picture": string;
  "company": string;
}
