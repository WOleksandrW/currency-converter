export type CurrenciesObjType = {
  [key: string]: string;
};

export type CoursesObjType = {
  [key: string]: number;
};

export type CurrencyCourseType = {
  date: string;
} & {
  [key: string]: CoursesObjType;
};
