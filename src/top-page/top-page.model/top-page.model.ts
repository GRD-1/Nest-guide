enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}
export class TopPageModel {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  hh?: {
    count: number;
    juneSalary: number;
    middleSalary: number;
    seniorSalary: number;
  };
  advantages: {
    title: string;
    description: string;
  }[];
  seoText: string;
  tagsTitle: string;
  tags: string[];
}
